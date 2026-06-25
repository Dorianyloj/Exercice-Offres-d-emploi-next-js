import { SliceZone } from "@prismicio/react";
import Link from "next/link";

import { MaterialSymbol } from "@/components/MaterialSymbol";
import { components } from "@/slices";
import type { HeaderDocument } from "@/types/prismic";

export function SiteHeader({ header }: { header: HeaderDocument | null }) {
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
          <MaterialSymbol name="account_circle" className="text-[22px] white" />
        </Link>
      </div>
    </header>
  );
}
