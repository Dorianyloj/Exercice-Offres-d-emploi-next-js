"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { JobOfferDocument } from "@/types/prismic";

type PinsState = {
  addApplication: (job: JobOfferDocument) => void;
  addPin: (job: JobOfferDocument) => void;
  applications: JobOfferDocument[];
  pins: JobOfferDocument[];
  removePin: (job: JobOfferDocument) => void;
  syncAvailablePins: (availableUIDs: string[]) => void;
};

export const usePinsStore = create<PinsState>()(
  persist(
    (set) => ({
      applications: [],
      pins: [],
      addApplication: (job) =>
        set((state) => ({
          applications: state.applications.some(
            (application) => application.uid === job.uid,
          )
            ? state.applications
            : [...state.applications, job],
        })),
      addPin: (job) =>
        set((state) => ({
          pins: state.pins.some((pin) => pin.uid === job.uid)
            ? state.pins
            : [...state.pins, job],
        })),
      removePin: (job) =>
        set((state) => ({
          pins: state.pins.filter((pin) => pin.uid !== job.uid),
        })),
      syncAvailablePins: (availableUIDs) =>
        set((state) => ({
          applications: state.applications.filter((application) =>
            availableUIDs.includes(application.uid),
          ),
          pins: state.pins.filter((pin) => availableUIDs.includes(pin.uid)),
        })),
    }),
    {
      name: "pins-storage",
    },
  ),
);
