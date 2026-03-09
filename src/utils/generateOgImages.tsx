import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

const fetchFonts = async () => {
  // Regular Font
  const fontFileRegular = await fetch(
    "https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/fonts/ttf/JetBrainsMono-Regular.ttf"
  );
  const fontRegular: ArrayBuffer = await fontFileRegular.arrayBuffer();

  // Bold Font
  const fontFileBold = await fetch(
    "https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/fonts/ttf/JetBrainsMono-Bold.ttf"
  );
  const fontBold: ArrayBuffer = await fontFileBold.arrayBuffer();

  return { fontRegular, fontBold };
};

const { fontRegular, fontBold } = await fetchFonts();

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "JetBrainsMono Nerd Font",
      data: fontRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "JetBrainsMono Nerd Font",
      data: fontBold,
      weight: 600,
      style: "normal",
    },
  ],
};

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await satori(postOgImage(post), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(), options);
  return svgBufferToPngBuffer(svg);
}
