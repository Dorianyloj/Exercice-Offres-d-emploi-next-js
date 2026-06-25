import * as prismic from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import { JobCountBadge } from "@/components/JobCountBadge";
import { JobsGrid } from "@/components/JobsGrid";
import { PageShell } from "@/components/PageShell";
import { getJobOffers, getSingleOrNull } from "@/lib/prismicQueries";
import { getTechnologyTags } from "@/lib/tags";
import type {
  FooterDocument,
  HeaderDocument,
  JobListDocument,
} from "@/types/prismic";
import { TechnologyTagList } from "./_components/TechnologyTagList";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const [header, footer, page, jobs] = await Promise.all([
    getSingleOrNull<HeaderDocument>("header"),
    getSingleOrNull<FooterDocument>("footer"),
    getSingleOrNull<JobListDocument>("job_list"),
    getJobOffers(),
  ]);

  const tags = getTechnologyTags(jobs);
  const title =
    page && prismic.asText(page.data.title)
      ? prismic.asText(page.data.title)
      : "Toutes les offres d'emploi";

  return (
    <PageShell header={header} footer={footer}>
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

          <JobCountBadge count={jobs.length} />
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Technologies
          </h2>
          <TechnologyTagList tags={tags} />
        </section>

        <section className="mt-10">
          <JobsGrid
            jobs={jobs}
            emptyMessage="Aucune offre publiée pour le moment."
          />
        </section>
      </main>
    </PageShell>
  );
}
