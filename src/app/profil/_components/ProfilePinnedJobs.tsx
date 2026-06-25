"use client";

import { JobCountBadge } from "@/components/JobCountBadge";
import { JobsGrid } from "@/components/JobsGrid";
import { usePinsStore } from "@/store/pins";

export function ProfilePinnedJobs() {
  const applications = usePinsStore((state) => state.applications);
  const pins = usePinsStore((state) => state.pins);

  return (
    <>
      <section className="mt-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-medium text-[var(--primary)]">
            Offres enregistrées
          </h2>
          <JobCountBadge count={pins.length} />
        </div>
        <JobsGrid
          jobs={pins}
          emptyMessage="Aucune offre enregistrée pour le moment."
        />
      </section>

      <section className="mt-16">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-medium text-[var(--primary)]">
            Historique des candidatures
          </h2>
          <JobCountBadge count={applications.length} />
        </div>
        <JobsGrid
          jobs={applications}
          emptyMessage="Aucune candidature envoyée pour le moment."
        />
      </section>
    </>
  );
}
