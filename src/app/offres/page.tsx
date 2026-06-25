import * as prismic from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";

import { JobCard } from "@/components/JobCard";
import { MaterialSymbol } from "@/components/MaterialSymbol";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getTagHref, getTechnologyTags } from "@/lib/tags";
import { createClient } from "@/prismicio";
import type {
  FooterDocument,
  HeaderDocument,
  JobListDocument,
  JobOfferDocument,
} from "@/types/prismic";

export const dynamic = "force-dynamic";

async function getSingleOrNull<TDocument extends prismic.Content.AllDocumentTypes>(
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

export default async function JobsPage() {
  const [header, footer, page, jobs] = await Promise.all([
    getSingleOrNull<HeaderDocument>("header"),
    getSingleOrNull<FooterDocument>("footer"),
    getSingleOrNull<JobListDocument>("job_list"),
    getAllJobOffers(),
  ]);

  const tags = getTechnologyTags(jobs);
  const title =
    page && prismic.asText(page.data.title)
      ? prismic.asText(page.data.title)
      : "Toutes les offres d'emploi";
  const jobCountLabel = `${jobs.length} ${jobs.length > 1 ? "offres" : "offre"}`;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader header={header} />

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-medium leading-none text-[var(--dark)]">
              {title}
            </h1>
            <div className="mt-3 h-1 w-full max-w-[420px] bg-[var(--primary)]" />
              <div className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                <PrismicRichText field={page?.data.description} />
              </div>
          </div>

          <div className="inline-flex items-center gap-3 bg-white px-4 py-3 text-[var(--dark)]">
            <span className="inline-flex h-10 w-10 items-center justify-center bg-[var(--primary)] text-white">
              <MaterialSymbol name="business_center" className="text-[22px]" />
            </span>
            <span className="text-lg font-semibold">{jobCountLabel}</span>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Technologies
          </h2>
          {tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={getTagHref(tag)}
                  className="border-2 border-[var(--primary)] bg-[var(--medium)] px-3 py-2 text-base font-medium text-[var(--primary)] transition hover:bg-white"
                >
                  {tag}
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              Aucun tag technologie pour le moment.
            </p>
          )}
        </section>

        <section className="mt-10">
          {jobs.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
              Aucune offre publiée pour le moment.
            </div>
          )}
        </section>
      </main>

      <SiteFooter footer={footer} />
    </div>
  );
}
