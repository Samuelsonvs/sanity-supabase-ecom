import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const configuredSanityClient = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2021-09-16",
  useCdn: true,
});

export const urlFor = (source: String | Object) =>
  imageUrlBuilder(configuredSanityClient).image(source);

export default configuredSanityClient;
