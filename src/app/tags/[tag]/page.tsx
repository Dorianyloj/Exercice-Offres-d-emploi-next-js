import * as prismic from "@prismicio/client";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JobCard } from "@/components/JobCard";
import { MaterialSymbol } from "@/components/MaterialSymbol";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getTagHref, getTagSlug, getTechnologyTags } from "@/lib/tags";
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
    <div className="min-h-screen bg-slate-50">
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
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-950">
              Offres avec {currentTag}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Retrouvez toutes les offres d&apos;emploi associées à cette
              technologie.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-800">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-white">
              <MaterialSymbol name="business_center" className="text-[22px]" />
            </span>
            <span className="text-lg font-semibold">{jobCountLabel}</span>
          </div>
        </section>

        {allTags.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500">
              Technologies
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const isActive = tag === currentTag;

                return (
                  <Link
                    key={tag}
                    href={getTagHref(tag)}
                    className={
                      isActive
                        ? "rounded-md border border-slate-950 bg-slate-950 px-3 py-2 text-sm font-medium text-white"
                        : "rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
                    }
                  >
                    {tag}
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}

        <section className="mt-10">
          {filteredJobs.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
