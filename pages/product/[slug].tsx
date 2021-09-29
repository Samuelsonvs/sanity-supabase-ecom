import React from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import Link from "next/link";

import configuredSanityClient from "@/utils/sanity";

export const Slug = ({ product }: any) => {
  console.log(product);
  return <div>slug</div>;
};

const productSlugs = groq`{
    "products":  *[_type == "product"]
}`;

export const getStaticPaths: GetStaticPaths = async () => {
  const { products } = await configuredSanityClient.fetch(productSlugs);
  return {
    paths: products.map((product: any) => ({
      params: {
        slug: product.slug.current,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const slug = params?.slug?.toString().trim();
  const productInfo = groq`{
        "product":  *[_type == "product" && slug.current == "${slug}"]
    }`;
  const { product } = await configuredSanityClient.fetch(productInfo);
  return {
    props: {
      product,
    },
  };
};

export default Slug;

// && ${slug} == current.slug
