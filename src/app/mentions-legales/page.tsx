import Mentions from "../../../public/mentions.mdx";

import { PageShell } from "@/components/PageShell";
import { getSingleOrNull } from "@/lib/prismicQueries";
import type { FooterDocument, HeaderDocument } from "@/types/prismic";

export const dynamic = "force-dynamic";

export default async function LegalNoticePage() {
  const [header, footer] = await Promise.all([
    getSingleOrNull<HeaderDocument>("header"),
    getSingleOrNull<FooterDocument>("footer"),
  ]);

  return (
    <PageShell header={header} footer={footer}>
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <article className="max-w-4xl space-y-6 text-base leading-8 text-slate-700 [&_h2]:text-[var(--primary)]">
          <Mentions />
        </article>
      </main>
    </PageShell>
  );
}
