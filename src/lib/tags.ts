import type { JobOfferDocument } from "@/types/prismic";

export function getTagSlug(tag: string) {
  return (
    tag
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "tag"
  );
}

export function getTagHref(tag: string) {
  return `/tags/${getTagSlug(tag)}`;
}

export function getTechnologyTags(jobs: JobOfferDocument[]) {
  return Array.from(new Set(jobs.flatMap((job) => job.tags))).sort((a, b) =>
    a.localeCompare(b, "fr", { sensitivity: "base" }),
  );
}
