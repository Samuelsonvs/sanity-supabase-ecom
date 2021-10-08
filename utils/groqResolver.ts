export const productSolver = (product: any) => {
    const { blurb, body, category, defaultProductVariant, slug } = Array.isArray(product) ? product[0] : product
    const { colors, images, price, qty, title } = defaultProductVariant
    return {
        blurb: blurb?.en,
        body: body?.en,
        category,
        colors,
        images,
        price,
        qty,
        title,
        slug: slug.current
    }
}