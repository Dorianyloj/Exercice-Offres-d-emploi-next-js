import { PrismicRichText } from "@prismicio/react";

import type { FooterDocument } from "@/types/prismic";

export function SiteFooter({ footer }: { footer: FooterDocument | null }) {
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
