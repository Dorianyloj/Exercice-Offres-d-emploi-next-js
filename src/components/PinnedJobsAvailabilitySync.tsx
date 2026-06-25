"use client";

import { useEffect } from "react";

import { usePinsStore } from "@/store/pins";

type AvailableJobUIDsResponse = {
  availableJobUIDs: string[];
};

export function PinnedJobsAvailabilitySync() {
  const syncAvailablePins = usePinsStore((state) => state.syncAvailablePins);

  useEffect(() => {
    async function syncPins() {
      const response = await fetch("/api/available-job-uids");

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as AvailableJobUIDsResponse;
      syncAvailablePins(data.availableJobUIDs);
    }

    syncPins();
  }, [syncAvailablePins]);

  return null;
}
