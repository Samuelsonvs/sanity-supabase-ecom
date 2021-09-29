import React from "react";
import { GetServerSideProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import Link from "next/link";
import { useRouter } from "next/router";

import configuredSanityClient from "@/utils/sanity";

export const Slug = ({ subCategories, products }: any) => {
  const router = useRouter();
  const routerName = router.query.products;
  const categoryId = subCategories.filter(
    (category: any) => category.slug.current === routerName
  )[0]?._id;
  console.log(3);
  return (
    <div>
      {products.map((product: any, idx: number) => {
        if (categoryId === product.categories[0]._ref) {
          return (
            <Link key={idx} passHref href={`/product/${product.slug.current}`}>
              <a className="block">{product.title}</a>
            </Link>
          );
        }
      })}
    </div>
  );
};

const productsCategory = groq`{
    "subCategories": *[_type == 'category' && parents != null ],
    "products":  *[_type == "product"]
}`;

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { subCategories, products } = await configuredSanityClient.fetch(
    productsCategory
  );
  return {
    props: {
      subCategories,
      products,
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//     const { categories } = await configuredSanityClient.fetch(productsCategory);
//     return {
//       paths: categories.map((category: any) => ({
//         params: {
//             slug: category.slug.current
//         },
//       })),
//       fallback: false,
//     };
// };

// export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
//     const slug = params?.slug;
//     return {
//         props: {
//             slug
//         },
//     }
// }

export default Slug;
