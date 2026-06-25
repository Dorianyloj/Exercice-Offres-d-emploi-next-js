import * as prismic from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import Link from "next/link";

import { JobsGrid } from "@/components/JobsGrid";
import { PageShell } from "@/components/PageShell";
import { getJobOffers, getSingleOrNull } from "@/lib/prismicQueries";
import type {
  FooterDocument,
  HeaderDocument,
  HomepageDocument,
} from "@/types/prismic";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [header, footer, homepage, jobs] = await Promise.all([
    getSingleOrNull<HeaderDocument>("header"),
    getSingleOrNull<FooterDocument>("footer"),
    getSingleOrNull<HomepageDocument>("homepage"),
    getJobOffers({ limit: 6 }),
  ]);

  const homepageTitle =
    homepage && prismic.asText(homepage.data.title)
      ? prismic.asText(homepage.data.title)
      : "Les dernières offres d'emploi";

  return (
    <PageShell header={header} footer={footer}>
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

        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            {homepage && prismic.isFilled.image(homepage.data.image) ? (
              <PrismicNextImage
                field={homepage.data.image}
                fallbackAlt=""
                className="h-64 w-full object-cover sm:h-80 lg:h-[360px]"
                priority
              />
            ) : (
              <Image
                src="/homepage-hero.png"
                alt=""
                width={1440}
                height={560}
                className="h-64 w-full object-cover sm:h-80 lg:h-[360px]"
                priority
              />
            )}
          </div>
        </section>

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

          <div className="mt-8">
            <JobsGrid
              jobs={jobs}
              emptyMessage="Aucune offre publiée pour le moment."
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            />
          </div>
        </section>
      </main>
    </PageShell>
  );
}
