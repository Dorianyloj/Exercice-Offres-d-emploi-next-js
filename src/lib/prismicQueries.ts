import type * as prismic from "@prismicio/client";

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
      ...(limit ? { limit } : {}),
      orderings: jobOfferOrderings,
    });
  } catch {
    return [];
  }
}
