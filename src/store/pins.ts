"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { JobOfferDocument } from "@/types/prismic";

type PinsState = {
  addPin: (job: JobOfferDocument) => void;
  pins: JobOfferDocument[];
  removePin: (job: JobOfferDocument) => void;
};

export const usePinsStore = create<PinsState>()(
  persist(
    (set) => ({
      pins: [],
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
    }),
    {
      name: "pins-storage",
    },
  ),
);
