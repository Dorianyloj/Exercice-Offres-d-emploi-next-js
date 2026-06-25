"use client";

import Link from "next/link";

import { MaterialSymbol } from "@/components/MaterialSymbol";
import { usePinsStore } from "@/store/pins";

export function PinnedJobsHeaderLink() {
  const pins = usePinsStore((state) => state.pins);

  return (
    <Link
      href="/profil"
      className="inline-flex h-10 items-center justify-center gap-1 rounded-full border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      aria-label="Profil"
    >
      <span>{pins.length}</span>
      <MaterialSymbol name="account_circle" className="text-[22px]" />
    </Link>
  );
}
