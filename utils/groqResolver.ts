import { GroqData } from "@/interfaces/groqData";

export const productSolver = (product: any) => {
  const { blurb, body, category, defaultProductVariant, variants, slug, _id } =
    Array.isArray(product) ? product[0] : product;
  const { colors, Color, images, price, qty, title } = defaultProductVariant;
  return {
    blurb: blurb?.en,
    body: body?.en,
    category,
    colors,
    Color,
    images,
    price,
    qty,
    title,
    variants,
    _id,
    slug: slug.current,
  };
};

export const bodySolver = (content: any) => {
  const { text } = content.children[0];

  return {
    text,
  };
};

export const variantSolver = (variant: any) => {
  const { Color, images, qty, price, title, _key } = variant;

  return {
    Color,
    images,
    qty,
    price,
    title,
    _key,
  };
};

export const topCategorySolver = (category: any) => {
  const { title, slug } = category;

  return {
    title,
    slug: slug.current,
  };
};

export const subCategorySolver = (category: any) => {
  const { title, slug, parents } = category;

  return {
    _ref: parents[0]._ref,
    title,
    slug: slug.current,
  };
};
