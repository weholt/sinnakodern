import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://weholt.github.io/sinnakodern/", // replace this with your deployed domain
  author: "Thomas Augestad Weholt",
  desc: "SinnaKodern — Thomas Weholt on Python, Django, tooling, free software, and software craftsmanship.",
  title: "SinnaKodern",
  ogImage: "assets/logo.png",
  lightAndDarkMode: true,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/weholt",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/weholt",
    linkTitle: `${SITE.title} on Facebook`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/weholt.no",
    linkTitle: `${SITE.title} on Instagram`,
    active: true,
  },
];
