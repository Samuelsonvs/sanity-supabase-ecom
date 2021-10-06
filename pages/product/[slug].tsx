import React from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import Image from "next/image";

import { urlFor } from "@/utils/sanity";
import Link from "next/link";

import configuredSanityClient from "@/utils/sanity";
import Container from "@/container/Container";

export const Slug = ({ product }: any) => {
  console.log(product);
  return (
      <Container>
        <section className="mt-4 sm:mt-20 prose max-w-6xl mx-auto">
          <div className="p-4 flex">
            <a className="cursor-pointer">
              <Image
                alt="ss"
                src={urlFor(product[0].defaultProductVariant.images[0].asset._ref).width(400).height(500).url() || ""}
                loading="lazy"
                title={"ss"}
                className="rounded-xl"
                height={500}
                width={400}
              />
            </a>
            <div>
              sa
            </div>
          </div>
        </section>
      </Container>
  )
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
