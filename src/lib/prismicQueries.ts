import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import type { JobOfferDocument } from "@/types/prismic";

const jobOfferOrderings: prismic.Ordering[] = [
  {
    field: "my.job_offer.published_at",
    direction: "desc",
  },
  {
    field: "document.first_publication_date",
    direction: "desc",
  },
];
const availableJobFilter = prismic.filter.at("my.job_offer.is_available", true);

export async function getSingleOrNull<
  TDocument extends prismic.Content.AllDocumentTypes,
>(type: TDocument["type"]) {
  const client = createClient();

  try {
    return await client.getSingle<TDocument>(type);
  } catch {
    return null;
  }
}

export async function getJobOffers({ limit }: { limit?: number } = {}) {
  const client = createClient();

  try {
    return await client.getAllByType<JobOfferDocument>("job_offer", {
      filters: [availableJobFilter],
      ...(limit ? { limit } : {}),
      orderings: jobOfferOrderings,
    });
  } catch {
    return [];
  }
}

export async function getJobOffersPage({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  const client = createClient();

  try {
    return await client.getByType<JobOfferDocument>("job_offer", {
      filters: [availableJobFilter],
      orderings: jobOfferOrderings,
      page,
      pageSize,
    });
  } catch {
    return null;
  }
}

export async function getJobOfferByUID(uid: string) {
  const client = createClient();

  try {
    return await client.getByUID<JobOfferDocument>("job_offer", uid, {
      filters: [availableJobFilter],
    });
  } catch {
    return null;
  }
}
