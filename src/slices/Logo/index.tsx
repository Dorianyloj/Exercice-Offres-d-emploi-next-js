import * as prismic from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import type { SliceComponentProps } from "@prismicio/react";

import type { LogoSlice } from "@/types/prismic";

type LogoProps = SliceComponentProps<LogoSlice>;

export default function Logo({ slice }: LogoProps) {
  if (!prismic.isFilled.image(slice.primary.image)) {
    return null;
  }

  return (
    <PrismicNextImage
      field={slice.primary.image}
      fallbackAlt=""
      className="h-10 w-auto"
    />
  );
}
