# SinnaKodern

SinnaKodern is Thomas Weholt’s personal engineering notebook: a small Astro site for notes, essays, TIL-style writing, and project pages.

The repo started from AstroPaper, but it is now curated as a personal site rather than a generic theme demo.

## What’s in here

- personal writing in `src/content/blog/`
- standalone pages in `src/pages/`
- Astro layouts and components for the public site
- a reusable Copilot prompt for creating new posts in `.github/prompts/`

## Stack

- [Astro](https://astro.build/)
- TypeScript
- Tailwind CSS
- React (for search UI)
- Playwright (link checks)
- Jampack (post-build optimization)

## Local development

Install dependencies:

```bash
npm ci
```

Run the dev server:

```bash
npm run dev
```

Build the site:

```bash
npm run build
```

Preview a production build:

```bash
npm run preview
```

## Useful scripts

| Command                       | Purpose                                   |
| :---------------------------- | :---------------------------------------- |
| `npm run dev`                 | Start Astro locally                       |
| `npm run build`               | Build and optimize the site               |
| `npm run preview`             | Preview the built site                    |
| `npm run lint`                | Run ESLint                                |
| `npm run format`              | Format the repo                           |
| `npm run test:links`          | Run Playwright link checks                |
| `npm run test:links:local`    | Run link checks against the local project |
| `npm run test:links:deployed` | Run link checks against the deployed site |

## Content model

Blog content lives in `src/content/blog/` and uses the schema defined in `src/content/config.ts`.

Expected frontmatter fields include:

- `title`
- `author`
- `slug`
- `description`
- `pubDatetime`
- `tags`
- optional `modDatetime`
- optional `featured`
- optional `draft`

The internal writing guide lives in `src/content/blog/adding-new-post.md` and stays private via `draft: true`.

## Reusable post prompt

There is a reusable Copilot prompt for creating new posts:

- `.github/prompts/create-post.prompt.md`
- `.github/prompts/create-post.template.md`

It creates a new file in `src/content/blog/`, derives a slug from the title, fills frontmatter, and inserts the provided text as Markdown.

## Deployment

The site is configured for static output and is deployed to GitHub Pages.

Production URL:

- `https://weholt.github.io/sinnakodern/`

## Notes

- `docker-compose.yml` is optional and only useful if you prefer running local dev in Docker.
- `.pages.yml` is only useful if you are using a CMS/editor integration that reads that file.
