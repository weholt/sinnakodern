import type { CollectionEntry } from "astro:content";

const projectFilter = ({ data }: CollectionEntry<"projects">) => {
  return !data.draft;
};

export default projectFilter;
