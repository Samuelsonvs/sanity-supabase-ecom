import { groq } from "next-sanity";

export const productsGroq = () => {
  return {
    productsQuery: groq`{
      "products":  *[_type == "product"]{
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
        title,
        _id
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
              variants,
              _id
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

export const productsSubCategoryId = (slug: string) => {
  return {
    subCategoryIdQuery: groq`{
      "categories":   *[_type == 'category' && slug.current == "${slug}"] {
        _id
      }
    }`
  }
}

export const productsSubCategoryFromKey = (key: string) => {
  return {
    subCategoryQuery: groq`{
      "subCategories": *[_type == 'category' && parents[0]._ref == "${key}"]{
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


export const productsFromKey = (key: string) => {
  return {
    productsQuery: groq`{
      "products": *[_type == 'product' && categories[0]._ref == "${key}"]
    }`
  }
}


export const productsSubCategory = () => {
  return {
    subCategoryQuery: groq`{
      "subCategories":   *[_type == 'category' && parents != null]{
        _id,
        title,
        slug,
        parents
    }
    }`
  }
}

export const basketGroq = (basket: string[]) => {
  return {
    basketQuery: groq`{
            "products":  *[_type == "product" && _id in ${[...basket]}]
        }`,
  };
};