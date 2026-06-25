import { NextResponse } from "next/server";

import { getJobOffers } from "@/lib/prismicQueries";

export async function GET() {
  const jobs = await getJobOffers();
  const availableJobUIDs = jobs.map((job) => job.uid);

  return NextResponse.json({
    availableJobUIDs,
  });
}
