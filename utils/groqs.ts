import { groq } from "next-sanity";

export const productsGroq = () => {
  return {
    productsQuery: groq`{
      "products":  *[_type == "product"] {
        blurb {
          en
        },
        body {
          en
        },
        categories,
        defaultProductVariant,
        slug {
          current
        },
        tags,
        category,
        variants,
        title
      },
    }`,
  };
};

export const productGroq = (slug: string | undefined) => {
  return {
    productQuery: groq`{
            "product":  *[_type == "product" && slug.current == "${slug}"]{
              blurb {
                en
              },
              body {
                en
              },
              category,
              defaultProductVariant {
                colors,
                images,
                price,
                qty,
                title
              },
              slug {
                current
              }
            }
        }`,
  };
};

export const productSlugsGroq = () => {
  return {
    slugsQuery: groq`{
            "products":  *[_type == "product"]
        }`,
  };
};
