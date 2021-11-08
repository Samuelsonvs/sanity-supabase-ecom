import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const configuredSanityClient = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2021-09-16",
  useCdn: true,
});

export const sanityImage = (
  source: String | Object,
  width: number,
  height: number
) =>
  imageUrlBuilder(configuredSanityClient)
    .image(source)
    .width(width)
    .height(height)
    .url();

export default configuredSanityClient;
