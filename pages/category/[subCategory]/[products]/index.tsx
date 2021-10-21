import { GetStaticPropsContext, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import configuredSanityClient from "@/utils/sanity";
import Container from "@/container/Container";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import { productSolver } from "@/utils/groqResolver";
import { productsFromKey, productsSubCategory, productsSubCategoryId, productsTopCategory } from "@/utils/groqs";

export const Slug = ({ products }: any) => {
  const router = useRouter();
  return (
    <Container>
      <div className="mt-4 sm:mt-20 px-3 prose max-w-6xl mx-auto">
        <Breadcrumb asPath={router.asPath} />
        <div className="flex flex-wrap gap-10">
          {products.map((product: any, idx: number) => {
              const { blurb, body, category, Color, colors, images, price, qty, title, variants, slug } =
              productSolver(product);
              return (
                <ProductCard 
                key={idx}
                image={images[0].asset._ref} 
                href={`/product/${slug}`} 
                title={title}
                />
              );
            
          })}
        </div>
      </div>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { subCategoryQuery } = productsSubCategory()
  const { topCategoryQuery } = productsTopCategory()
  const { subCategories } = await configuredSanityClient.fetch(subCategoryQuery);
  const { categories } = await configuredSanityClient.fetch(topCategoryQuery);
  const topCategoriesObject = categories.reduce((acc:any, cur:any) => ({ ...acc, [cur._id]: cur.slug.current}), {})
  return {
    paths: subCategories.map((category: any) => ({
      params: {
          subCategory: topCategoriesObject[category.parents[0]._ref],
          products: category.slug.current
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const slug = params?.products;
  const { subCategoryIdQuery } = productsSubCategoryId(slug?.toString() ?? '')
  const { categories } = await configuredSanityClient.fetch(subCategoryIdQuery);
  const { productsQuery } = productsFromKey(categories[0]._id)
  const { products } = await configuredSanityClient.fetch(
    productsQuery
);
  return {
      props: {
        products
      },
  }
}

export default Slug;
