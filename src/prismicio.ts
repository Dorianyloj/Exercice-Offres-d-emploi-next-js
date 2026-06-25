import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

import smConfig from "../slicemachine.config.json";

export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME || smConfig.repositoryName;

const routes: prismic.ClientConfig["routes"] = [
  {
    type: "job_offer",
    path: "/offres/:uid",
  },
];

export function createClient(config: prismicNext.CreateClientConfig = {}) {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({ client });

  return client;
}
