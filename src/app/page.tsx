import * as prismic from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import { ButtonLink } from "@/components/ButtonLink";
import { JobsGrid } from "@/components/JobsGrid";
import { PageShell } from "@/components/PageShell";
import { PageTitle } from "@/components/PageTitle";
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
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <PrismicNextImage
                field={homepage?.data.image}
                fallbackAlt=""
                className="h-64 w-full object-cover sm:h-80 lg:h-[360px]"
                priority
              />
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <PageTitle>{homepageTitle}</PageTitle>

          <div className="mt-8">
            <JobsGrid
              jobs={jobs}
              emptyMessage="Aucune offre publiée pour le moment."
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            />
          </div>
          <ButtonLink href="/offres" className="mt-4">
            Voir toutes les offres
          </ButtonLink>
        </section>
      </main>
    </PageShell>
  );
}
