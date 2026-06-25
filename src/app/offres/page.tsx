import * as prismic from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import { JobCountBadge } from "@/components/JobCountBadge";
import { JobsGrid } from "@/components/JobsGrid";
import { PageShell } from "@/components/PageShell";
import { PageTitle } from "@/components/PageTitle";
import { TechnologyTagList } from "@/components/TechnologyTagList";
import {
  getJobOffers,
  getJobOffersPage,
  getSingleOrNull,
} from "@/lib/prismicQueries";
import { getTechnologyTags } from "@/lib/tags";
import type {
  FooterDocument,
  HeaderDocument,
  JobListDocument,
} from "@/types/prismic";
import { Pagination } from "./_components/Pagination";

export const dynamic = "force-dynamic";

const JOBS_PER_PAGE = 6;

type JobsPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

function getRequestedPage(page: string | undefined) {
  const parsedPage = Number(page);

  if (!Number.isInteger(parsedPage) || parsedPage < 1) {
    return 1;
  }

  return parsedPage;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const { page: pageParam } = await searchParams;
  const requestedPage = getRequestedPage(pageParam);
  const [header, footer, page, jobsForTags, requestedJobsPage] = await Promise.all([
    getSingleOrNull<HeaderDocument>("header"),
    getSingleOrNull<FooterDocument>("footer"),
    getSingleOrNull<JobListDocument>("job_list"),
    getJobOffers(),
    getJobOffersPage({
      page: requestedPage,
      pageSize: JOBS_PER_PAGE,
    }),
  ]);

  let jobsPage = requestedJobsPage;
  let totalPages = Math.max(1, jobsPage?.total_pages || 1);
  let currentPage = Math.min(requestedPage, totalPages);

  if (requestedPage > totalPages) {
    jobsPage = await getJobOffersPage({
      page: currentPage,
      pageSize: JOBS_PER_PAGE,
    });
    totalPages = Math.max(1, jobsPage?.total_pages || 1);
    currentPage = Math.min(currentPage, totalPages);
  }

  const jobs = jobsPage?.results || [];
  const totalJobs = jobsPage?.total_results_size || 0;
  const tags = getTechnologyTags(jobsForTags);
  const title =
    page && prismic.asText(page.data.title)
      ? prismic.asText(page.data.title)
      : "Toutes les offres d'emploi";

  return (
    <PageShell header={header} footer={footer}>
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <PageTitle>{title}</PageTitle>
            <div className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              <PrismicRichText field={page?.data.description} />
            </div>
          </div>

          <JobCountBadge count={totalJobs} />
        </section>

        <section className="mt-10">
          <TechnologyTagList tags={tags} />
        </section>

        <section className="mt-10">
          <JobsGrid
            jobs={jobs}
            emptyMessage="Aucune offre publiée pour le moment."
          />
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </section>
      </main>
    </PageShell>
  );
}
