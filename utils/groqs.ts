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
                Color {
                  hex
                },
                images,
                price,
                qty,
                title
              },
              slug {
                current
              },
              variants
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

export const relatedProductGroq = (
  category: string | undefined,
  slug: string | undefined
) => {
  return {
    relatedQuery: groq`{
            "relatedProducts": *[_type == "product" && category == "${category}" && slug.current != "${slug}"]
    }`,
  };
};


export const productsTopCategory = () => {
  return {
    topCategoryQuery: groq`{
      "categories":   *[_type == 'category' && parents == null]{
        _id,
        title,
        slug
    }
    }`
  }
}

export const productsTopCategoryId = (slug: string) => {
  return {
    topCategoryIdQuery: groq`{
      "categories":   *[_type == 'category' && slug.current == "${slug}"] {
        _id
      }
    }`
  }
}

export const productsSubCategory = (key: string) => {
  return {
    subCategoryQuery: groq`{
      "subCategories": *[_type == 'category' && parents[0]._ref == "${key}" ]{
          title,
          parents,
          slug {
              current
          },
          _id
      }
    }`
  }
}