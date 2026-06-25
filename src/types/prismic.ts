import type * as prismic from "@prismicio/client";

export type HeaderDocument = prismic.PrismicDocument<
  {
    site_name: prismic.KeyTextField;
    background_color: prismic.ColorField;
    slices: prismic.SliceZone<LogoSlice>;
  },
  "header"
>;

export type FooterDocument = prismic.PrismicDocument<
  {
    text: prismic.RichTextField;
    copyright: prismic.KeyTextField;
  },
  "footer"
>;

export type LogoSlice = prismic.Slice<
  "logo",
  {
    image: prismic.ImageField;
  }
>;

export type HomepageDocument = prismic.PrismicDocument<
  {
    title: prismic.TitleField;
    description: prismic.RichTextField;
    image: prismic.ImageField;
  },
  "homepage"
>;

export type JobListDocument = prismic.PrismicDocument<
  {
    title: prismic.TitleField;
    description: prismic.RichTextField;
  },
  "job_list"
>;

export type JobOfferDocument = prismic.PrismicDocumentWithUID<
  {
    title: prismic.TitleField;
    company: prismic.KeyTextField;
    location: prismic.KeyTextField;
    contract_type: prismic.SelectField;
    published_at: prismic.DateField;
    is_available: prismic.BooleanField;
    excerpt: prismic.RichTextField;
    content: prismic.RichTextField;
  },
  "job_offer"
>;
