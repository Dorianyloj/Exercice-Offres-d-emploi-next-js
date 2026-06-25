"use client";

import { JobCountBadge } from "@/components/JobCountBadge";
import { JobsGrid } from "@/components/JobsGrid";
import { usePinsStore } from "@/store/pins";

export function ProfilePinnedJobs() {
  const pins = usePinsStore((state) => state.pins);

  return (
    <section className="mt-10">
      <div className="mb-6 flex justify-end">
        <JobCountBadge count={pins.length} />
      </div>
      <JobsGrid
        jobs={pins}
        emptyMessage="Aucune offre enregistrée pour le moment."
      />
    </section>
  );
}
