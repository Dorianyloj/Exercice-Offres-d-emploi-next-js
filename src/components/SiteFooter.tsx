import * as prismic from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";

import type { FooterDocument } from "@/types/prismic";

function getFooterLinkFallback(label: string) {
  const normalizedLabel = label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (normalizedLabel.includes("offres")) {
    return "/offres";
  }

  if (normalizedLabel.includes("profil")) {
    return "/profil";
  }

  if (normalizedLabel.includes("mentions")) {
    return "/mentions-legales";
  }

  return "#";
}

export function SiteFooter({ footer }: { footer: FooterDocument | null }) {
  const footerLinks = footer?.data.link || [];

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-slate-500 sm:px-6 lg:px-8">
        {footer?.data.text ? (
          <PrismicRichText field={footer.data.text} />
        ) : (
          <p>Mini-application Next.js connectée à Prismic.</p>
        )}

        {footerLinks.length > 0 ? (
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLinks.map((item, index) => {
              const linkText =
                "text" in item.link && typeof item.link.text === "string"
                  ? item.link.text
                  : null;
              const label = item.text_link || linkText || "Lien";
              const href = prismic.asLink(item.link) || getFooterLinkFallback(label);
              const target = "target" in item.link ? item.link.target : undefined;

              return (
                <Link
                  key={`${label}-${index}`}
                  href={href}
                  target={target}
                  className="font-medium text-slate-700 transition hover:text-[var(--primary)]"
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        ) : null}

        <p>{footer?.data.copyright || "© 2026 Offres d'emploi"}</p>
      </div>
    </footer>
  );
}
