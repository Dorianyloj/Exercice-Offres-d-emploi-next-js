import * as prismic from "@prismicio/client";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JobCard } from "@/components/JobCard";
import { MaterialSymbol } from "@/components/MaterialSymbol";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getTagSlug, getTechnologyTags } from "@/lib/tags";
import { createClient } from "@/prismicio";
import type {
  FooterDocument,
  HeaderDocument,
  JobOfferDocument,
} from "@/types/prismic";

export const dynamic = "force-dynamic";

type TagPageProps = {
  params: Promise<{
    tag: string;
  }>;
};

async function getSingleOrNull<TDocument extends prismic.PrismicDocument>(
  type: TDocument["type"],
) {
  const client = createClient();

  try {
    return await client.getSingle<TDocument>(type);
  } catch {
    return null;
  }
}

async function getAllJobOffers() {
  const client = createClient();

  try {
    return await client.getAllByType<JobOfferDocument>("job_offer", {
      orderings: [
        {
          field: "my.job_offer.published_at",
          direction: "desc",
        },
        {
          field: "document.first_publication_date",
          direction: "desc",
        },
      ],
    });
  } catch {
    return [];
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: tagSlug } = await params;
  const [header, footer, jobs] = await Promise.all([
    getSingleOrNull<HeaderDocument>("header"),
    getSingleOrNull<FooterDocument>("footer"),
    getAllJobOffers(),
  ]);

  const allTags = getTechnologyTags(jobs);
  const currentTag = allTags.find((tag) => getTagSlug(tag) === tagSlug);

  if (!currentTag) {
    notFound();
  }

  const filteredJobs = jobs.filter((job) => job.tags.includes(currentTag));
  const jobCountLabel = `${filteredJobs.length} ${
    filteredJobs.length > 1 ? "offres" : "offre"
  }`;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader header={header} />

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <Link
              href="/offres"
              className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              Toutes les offres
            </Link>
            <h1 className="mt-3 text-5xl font-medium leading-none text-[var(--dark)]">
              {currentTag}
            </h1>
            <div className="mt-3 h-1 w-full max-w-[420px] bg-[var(--primary)]" />
          </div>

          <div className="inline-flex items-center gap-3 bg-white px-4 py-3 text-[var(--dark)]">
            <span className="inline-flex h-10 w-10 items-center justify-center bg-[var(--primary)] text-white">
              <MaterialSymbol name="business_center" className="text-[22px]" />
            </span>
            <span className="text-lg font-semibold">{jobCountLabel}</span>
          </div>
        </section>

        <section className="mt-10">
          {filteredJobs.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
              Aucune offre publiée pour ce tag.
            </div>
          )}
        </section>
      </main>

      <SiteFooter footer={footer} />
    </div>
  );
}
