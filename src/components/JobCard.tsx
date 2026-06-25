import * as prismic from "@prismicio/client";
import Link from "next/link";

import { getTagHref } from "@/lib/tags";
import type { JobOfferDocument } from "@/types/prismic";

export function JobCard({ job }: { job: JobOfferDocument }) {
  const title = prismic.asText(job.data.title) || "Offre sans titre";
  const excerpt = prismic.asText(job.data.excerpt);
  const publishedAt = job.data.published_at
    ? new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(job.data.published_at))
    : null;

  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
        {job.data.contract_type ? <span>{job.data.contract_type}</span> : null}
        {job.data.location ? <span>{job.data.location}</span> : null}
        {publishedAt ? <span>{publishedAt}</span> : null}
      </div>

      <h2 className="mt-3 text-xl font-semibold leading-7 text-slate-950">
        <Link href={job.url || `/offres/${job.uid}`} className="hover:underline">
          {title}
        </Link>
      </h2>

      {job.data.company ? (
        <p className="mt-1 text-sm font-medium text-slate-700">
          {job.data.company}
        </p>
      ) : null}

      {excerpt ? (
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {excerpt}
        </p>
      ) : null}

      {job.tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <Link
              key={tag}
              href={getTagHref(tag)}
              className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
            >
              {tag}
            </Link>
          ))}
        </div>
      ) : null}

      <div className="mt-auto pt-5">
        <span
          className={
            job.data.is_available
              ? "text-sm font-medium text-emerald-700"
              : "text-sm font-medium text-red-700"
          }
        >
          {job.data.is_available ? "Disponible" : "Indisponible"}
        </span>
      </div>
    </article>
  );
}
