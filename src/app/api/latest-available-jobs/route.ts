import * as prismic from "@prismicio/client";
import { NextResponse } from "next/server";

import { getJobOffers } from "@/lib/prismicQueries";

export async function GET() {
  const jobs = await getJobOffers();
  const latestAvailableJobs = jobs
    .filter((job) => job.data.is_available)
    .slice(0, 3)
    .map((job) => ({
      company: job.data.company,
      contractType: job.data.contract_type,
      location: job.data.location,
      publishedAt: job.data.published_at,
      tags: job.tags,
      title: prismic.asText(job.data.title),
      uid: job.uid,
      url: job.url || `/offres/${job.uid}`,
    }));

  return NextResponse.json({
    jobs: latestAvailableJobs,
  });
}
