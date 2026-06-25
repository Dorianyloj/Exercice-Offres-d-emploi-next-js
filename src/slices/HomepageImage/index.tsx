import { PrismicNextImage } from "@prismicio/next";
import type { SliceComponentProps } from "@prismicio/react";

import type { HomepageImageSlice } from "@/types/prismic";

type HomepageImageProps = SliceComponentProps<HomepageImageSlice>;

export default function HomepageImage({ slice }: HomepageImageProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
        <PrismicNextImage
          field={slice.primary.image}
          fallbackAlt=""
          className="h-64 w-full object-cover sm:h-80 lg:h-[360px]"
          priority
        />
      </div>
      {slice.primary.caption ? (
        <p className="mt-3 text-sm text-slate-500">{slice.primary.caption}</p>
      ) : null}
    </section>
  );
}
