import Link from "next/link";
import { notFound } from "next/navigation";

import { JobCountBadge } from "@/components/JobCountBadge";
import { JobsGrid } from "@/components/JobsGrid";
import { PageShell } from "@/components/PageShell";
import { getJobOffers, getSingleOrNull } from "@/lib/prismicQueries";
import { getTagSlug, getTechnologyTags } from "@/lib/tags";
import type { FooterDocument, HeaderDocument } from "@/types/prismic";

export const dynamic = "force-dynamic";

type TagPageProps = {
  params: Promise<{
    tag: string;
  }>;
};

export default async function TagPage({ params }: TagPageProps) {
  const { tag: tagSlug } = await params;
  const [header, footer, jobs] = await Promise.all([
    getSingleOrNull<HeaderDocument>("header"),
    getSingleOrNull<FooterDocument>("footer"),
    getJobOffers(),
  ]);

  const allTags = getTechnologyTags(jobs);
  const currentTag = allTags.find((tag) => getTagSlug(tag) === tagSlug);

  if (!currentTag) {
    notFound();
  }

  const filteredJobs = jobs.filter((job) => job.tags.includes(currentTag));

  return (
    <PageShell header={header} footer={footer}>
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

          <JobCountBadge count={filteredJobs.length} />
        </section>

        <section className="mt-10">
          <JobsGrid
            jobs={filteredJobs}
            emptyMessage="Aucune offre publiée pour ce tag."
          />
        </section>
      </main>
    </PageShell>
  );
}
