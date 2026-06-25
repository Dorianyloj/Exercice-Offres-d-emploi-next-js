import { PageShell } from "@/components/PageShell";
import { getSingleOrNull } from "@/lib/prismicQueries";
import type { FooterDocument, HeaderDocument } from "@/types/prismic";
import { ProfilePinnedJobs } from "./_components/ProfilePinnedJobs";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const [header, footer] = await Promise.all([
    getSingleOrNull<HeaderDocument>("header"),
    getSingleOrNull<FooterDocument>("footer"),
  ]);

  return (
    <PageShell header={header} footer={footer}>
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="max-w-3xl">
          <h1 className="text-5xl font-medium leading-none text-[var(--dark)]">
            Profil
          </h1>
          <div className="mt-3 h-1 w-full max-w-[420px] bg-[var(--primary)]" />
        </section>

        <ProfilePinnedJobs />
      </main>
    </PageShell>
  );
}
