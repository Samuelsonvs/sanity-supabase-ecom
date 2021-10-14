import { GroqData } from "@/interfaces/groqData";

export const productSolver = (product: any) => {
  const { blurb, body, category, defaultProductVariant, variants, slug } = Array.isArray(
    product
  )
    ? product[0]
    : product;
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
  const { Color, images, qty, price, title} = variant

  return {
    Color,
    images,
    qty,
    price,
    title
  }
}