"use client";

import { MaterialSymbol } from "@/components/MaterialSymbol";
import { usePinsStore } from "@/store/pins";
import type { JobOfferDocument } from "@/types/prismic";

type PinJobButtonProps = {
  job: JobOfferDocument;
  title: string;
};

export function PinJobButton({ job, title }: PinJobButtonProps) {
  const { addPin, pins, removePin } = usePinsStore();
  const isPinned = pins.some((pin) => pin.uid === job.uid);

  return (
    <button
      type="button"
      className={
        isPinned
          ? "inline-flex h-6 w-6 shrink-0 items-center justify-center text-[var(--primary)]"
          : "inline-flex h-6 w-6 shrink-0 items-center justify-center text-[var(--dark)]"
      }
      aria-label={
        isPinned
          ? `Retirer l'offre ${title} des favoris`
          : `Enregistrer l'offre ${title}`
      }
      aria-pressed={isPinned}
      onClick={() => (isPinned ? removePin(job) : addPin(job))}
    >
      <MaterialSymbol
        name={isPinned ? "bookmark_added" : "bookmark"}
        className="text-[22px]"
      />
    </button>
  );
}
