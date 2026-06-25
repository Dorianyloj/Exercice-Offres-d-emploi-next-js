import * as prismic from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import Link from "next/link";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import type {
  FooterDocument,
  HeaderDocument,
  HomepageDocument,
  JobOfferDocument,
} from "@/types/prismic";

export const dynamic = "force-dynamic";

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

async function getLatestJobOffers() {
  const client = createClient();

  try {
    return await client.getAllByType<JobOfferDocument>("job_offer", {
      limit: 6,
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

function ProfileIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
      />
    </svg>
  );
}

function SiteHeader({ header }: { header: HeaderDocument | null }) {
  const siteName = header?.data.site_name || "Offres d'emploi";
  const hasLogoSlice = Boolean(header?.data.slices?.length);
  const headerBackgroundColor = header?.data.background_color;
  const backgroundColor =
    typeof headerBackgroundColor === "string" &&
    /^#[0-9a-f]{6}$/i.test(headerBackgroundColor)
      ? headerBackgroundColor
      : undefined;

  return (
    <header
      className="border-b border-slate-200 bg-white"
      style={{ backgroundColor }}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          {hasLogoSlice ? (
            <>
              <SliceZone
                slices={header?.data.slices || []}
                components={components}
              />
              <span className="sr-only">{siteName}</span>
            </>
          ) : (
            <span className="text-lg font-semibold text-slate-950">
              {siteName}
            </span>
          )}
        </Link>

        <Link
          href="/profil"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          aria-label="Profil"
        >
          <ProfileIcon />
        </Link>
      </div>
    </header>
  );
}

function JobCard({ job }: { job: JobOfferDocument }) {
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
            <span
              key={tag}
              className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
            >
              {tag}
            </span>
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

function SiteFooter({ footer }: { footer: FooterDocument | null }) {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:px-6 lg:px-8">
        {footer?.data.text ? (
          <PrismicRichText field={footer.data.text} />
        ) : (
          <p>Mini-application Next.js connectée à Prismic.</p>
        )}
        <p>{footer?.data.copyright || "© 2026 Offres d'emploi"}</p>
      </div>
    </footer>
  );
}

export default async function Home() {
  const [header, footer, homepage, jobs] = await Promise.all([
    getSingleOrNull<HeaderDocument>("header"),
    getSingleOrNull<FooterDocument>("footer"),
    getSingleOrNull<HomepageDocument>("homepage"),
    getLatestJobOffers(),
  ]);

  const homepageTitle =
    homepage && prismic.asText(homepage.data.title)
      ? prismic.asText(homepage.data.title)
      : "Les dernières offres d'emploi";

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader header={header} />

      <main>
        <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-tight text-slate-950">
              {homepageTitle}
            </h1>
            {homepage?.data.description ? (
              <div className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                <PrismicRichText field={homepage.data.description} />
              </div>
            ) : (
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                Consultez les offres les plus récentes et retrouvez rapidement
                les technologies qui correspondent à votre profil.
              </p>
            )}
          </div>
        </section>

        {homepage?.data.slices?.length ? (
          <SliceZone slices={homepage.data.slices} components={components} />
        ) : (
          <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-64 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm text-slate-500 sm:h-80 lg:h-[360px]">
              Image homepage à ajouter dans Prismic
            </div>
          </section>
        )}

        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                Recrutement
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                6 dernières offres
              </h2>
            </div>
            <Link
              href="/offres"
              className="inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Voir toutes les offres
            </Link>
          </div>

          {jobs.length > 0 ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
              Aucune offre publiée pour le moment.
            </div>
          )}
        </section>
      </main>

      <SiteFooter footer={footer} />
    </div>
  );
}
