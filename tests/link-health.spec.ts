import { expect, test } from "@playwright/test";

const SKIP_PROTOCOLS = ["mailto:", "tel:", "javascript:"];
const CHECK_EXTERNAL_LINKS = process.env.CHECK_EXTERNAL_LINKS === "1";

function normalizeUrl(rawHref: string, currentUrl: string): URL | null {
  const href = rawHref.trim();
  if (!href || href.startsWith("#")) return null;
  if (SKIP_PROTOCOLS.some(protocol => href.startsWith(protocol))) return null;

  try {
    const url = new URL(href, currentUrl);
    url.hash = "";
    return url;
  } catch {
    return null;
  }
}

test("crawl all internal links and verify no dead links", async ({
  page,
  request,
  baseURL,
}) => {
  expect(baseURL, "Playwright baseURL must be configured").toBeTruthy();

  const root = new URL(baseURL!);
  const visitedPages = new Set<string>();
  const checkedTargets = new Set<string>();
  const queue: string[] = [root.toString()];

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visitedPages.has(current)) continue;
    visitedPages.add(current);

    const response = await page.goto(current, { waitUntil: "domcontentloaded" });
    expect(response, `No response when navigating to ${current}`).not.toBeNull();
    expect(
      response!.status(),
      `Page navigation failed for ${current}`
    ).toBeLessThan(400);

    const hrefs = await page.locator("a[href]").evaluateAll(anchors =>
      anchors
        .map(anchor => ({
          href: anchor.getAttribute("href") ?? "",
          target: anchor.getAttribute("target") ?? "",
        }))
        .filter(item => Boolean(item.href))
    );

    for (const item of hrefs) {
      const normalized = normalizeUrl(item.href, current);
      if (!normalized) continue;

      const normalizedStr = normalized.toString();
      if (checkedTargets.has(normalizedStr)) continue;
      checkedTargets.add(normalizedStr);

      // External links are optional and not crawled.
      if (normalized.origin !== root.origin) {
        if (CHECK_EXTERNAL_LINKS) {
          const externalResponse = await request.get(normalizedStr, {
            failOnStatusCode: false,
          });
          expect(
            externalResponse.status(),
            `Dead external link found: ${normalizedStr}`
          ).toBeLessThan(400);
        }
        continue;
      }

      // Click each same-origin link (same-tab links only) to validate UI navigation.
      if (item.target !== "_blank") {
        await page.goto(current, { waitUntil: "domcontentloaded" });

        const linkIndex = await page
          .locator("a[href]")
          .evaluateAll((anchors, targetUrl) => {
            for (let i = 0; i < anchors.length; i++) {
              const href = anchors[i].getAttribute("href") ?? "";
              const target = anchors[i].getAttribute("target") ?? "";
              if (!href || target === "_blank") continue;
              if (
                href.startsWith("#") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:") ||
                href.startsWith("javascript:")
              ) {
                continue;
              }

              const resolved = new URL(href, window.location.href);
              resolved.hash = "";
              if (resolved.toString() === targetUrl) return i;
            }
            return -1;
          }, normalizedStr);

        if (linkIndex >= 0) {
          await Promise.all([
            page
              .waitForURL(url => {
                const candidate = new URL(url.toString());
                candidate.hash = "";
                return candidate.toString() === normalizedStr;
              })
              .catch(() => null),
            page.locator("a[href]").nth(linkIndex).click(),
          ]);
        }
      }

      const linkResponse = await request.get(normalizedStr, {
        failOnStatusCode: false,
      });

      expect(
        linkResponse.status(),
        `Dead internal link found: ${normalizedStr}`
      ).toBeLessThan(400);

      // Only crawl paths that remain within this site.
      queue.push(normalizedStr);
    }
  }

  expect(visitedPages.size).toBeGreaterThan(1);
});
