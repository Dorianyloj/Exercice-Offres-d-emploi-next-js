import * as prismic from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MaterialSymbol } from "@/components/MaterialSymbol";
import { PageShell } from "@/components/PageShell";
import { PageTitle } from "@/components/PageTitle";
import {
  getJobOfferByUID,
  getSingleOrNull,
} from "@/lib/prismicQueries";
import { getTagHref } from "@/lib/tags";
import type { FooterDocument, HeaderDocument } from "@/types/prismic";
import { JobMessageForm } from "./_components/JobMessageForm";

export const dynamic = "force-dynamic";

type JobOfferPageProps = {
  params: Promise<{
    uid: string;
  }>;
};

function formatDate(date: string | null) {
  if (!date) {
    return null;
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function JobOfferPage({ params }: JobOfferPageProps) {
  const { uid } = await params;
  const [header, footer, job] = await Promise.all([
    getSingleOrNull<HeaderDocument>("header"),
    getSingleOrNull<FooterDocument>("footer"),
    getJobOfferByUID(uid),
  ]);

  if (!job) {
    notFound();
  }

  const title = prismic.asText(job.data.title) || "Offre sans titre";
  const publishedAt = formatDate(job.data.published_at);
  const publishedAtDateTime = job.data.published_at || undefined;
  const adminEmails = job.data.admin_emails
    .map((adminEmail) => adminEmail.email)
    .filter((email): email is string => Boolean(email));

  return (
    <PageShell header={header} footer={footer}>
      <main className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8">
        <article className="bg-white px-5 py-8 sm:px-10 lg:px-14">
          <PageTitle>{title}</PageTitle>

          {publishedAt ? (
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
              <MaterialSymbol name="calendar_month" className="text-[18px]" />
              <time dateTime={publishedAtDateTime}>{publishedAt}</time>
            </div>
          ) : null}

          {job.tags.length > 0 ? (
            <div className="mt-4 flex items-start gap-2 text-sm font-semibold text-[var(--primary)]">
              <MaterialSymbol name="code" className="text-[18px]" />
              <div className="flex flex-wrap gap-x-2 gap-y-1">
                {job.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={getTagHref(tag)}
                    className="underline-offset-2 hover:underline"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8 max-w-none text-base leading-8 text-slate-700">
            <PrismicRichText field={job.data.content} />
          </div>

          <JobMessageForm
            adminEmails={adminEmails}
            jobTitle={title}
            jobUid={job.uid}
          />
        </article>
      </main>
    </PageShell>
  );
}
