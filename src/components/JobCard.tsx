import * as prismic from "@prismicio/client";
import Link from "next/link";

import { MaterialSymbol } from "@/components/MaterialSymbol";
import { getTagHref } from "@/lib/tags";
import type { JobOfferDocument } from "@/types/prismic";

export function JobCard({ job }: { job: JobOfferDocument }) {
  const title = prismic.asText(job.data.title) || "Offre sans titre";
  const excerpt = prismic.asText(job.data.excerpt);
  const publishedAt = job.data.published_at
    ? new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(job.data.published_at))
    : null;

  return (
    <article className="flex min-h-[225px] flex-col bg-[var(--light)] px-5 py-8">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-bold leading-none text-black">
          <Link
            href={job.url || `/offres/${job.uid}`}
            className="hover:underline"
          >
            {title}
          </Link>
        </h2>
        <button
          type="button"
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center text-[var(--dark)]"
          aria-label="Enregistrer l'offre"
        >
          <MaterialSymbol name="bookmark_border" className="text-[22px]" />
        </button>
      </div>

      <div className="mt-5 space-y-2 text-xs font-semibold text-[var(--primary)]">
        {publishedAt ? (
          <div className="flex items-center gap-2">
            <MaterialSymbol name="calendar_month" className="text-[18px]" />
            <span>{publishedAt}</span>
          </div>
        ) : null}

        {job.tags.length > 0 ? (
          <div className="flex items-start gap-2">
            <MaterialSymbol name="code" className="text-[18px]" />
            <div className="flex flex-wrap gap-x-1 gap-y-1">
              {job.tags.map((tag, index) => (
                <Link
                  key={tag}
                  href={getTagHref(tag)}
                  className="underline-offset-2 hover:underline"
                >
                  {tag}
                  {index < job.tags.length - 1 ? "," : ""}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {job.data.company || job.data.contract_type || job.data.location ? (
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-500">
          {job.data.company ? <span>{job.data.company}</span> : null}
          {job.data.contract_type ? <span>{job.data.contract_type}</span> : null}
          {job.data.location ? <span>{job.data.location}</span> : null}
        </div>
      ) : null}

      {excerpt ? (
        <p className="mt-4 line-clamp-3 text-sm font-medium leading-normal text-black">
          {excerpt}
        </p>
      ) : (
        <p className="mt-4 text-sm font-medium leading-normal text-black">
          Voir le détail de cette offre d&apos;emploi.
        </p>
      )}

      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between gap-3">
          <span
            className={
              job.data.is_available
                ? "text-xs font-semibold text-emerald-700"
                : "text-xs font-semibold text-red-700"
            }
          >
            {job.data.is_available ? "Disponible" : "Indisponible"}
          </span>
        </div>
      </div>
    </article>
  );
}
