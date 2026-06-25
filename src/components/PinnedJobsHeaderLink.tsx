"use client";

import Link from "next/link";

import { MaterialSymbol } from "@/components/MaterialSymbol";
import { usePinsStore } from "@/store/pins";

export function PinnedJobsHeaderLink() {
  const pins = usePinsStore((state) => state.pins);

  return (
    <Link
      href="/profil"
      className="inline-flex h-10 items-center justify-center gap-1 rounded-full border border-white/30 px-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-black/10"
      aria-label="Profil"
    >
      <span className="text-white">{pins.length}</span>
      <MaterialSymbol name="account_circle" className="text-white" />
    </Link>
  );
}
