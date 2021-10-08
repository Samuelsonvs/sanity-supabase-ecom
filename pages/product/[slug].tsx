import React from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import Image from "next/image";

import { urlFor } from "@/utils/sanity";
import Link from "next/link";

import configuredSanityClient from "@/utils/sanity";
import Container from "@/container/Container";
import { GroqData } from "@/interfaces/groqData";
import { productSolver } from "@/utils/groqResolver";
import { productGroq, productSlugsGroq } from "@/utils/groqs";

export const Slug = ({ product }: GroqData.Product) => {
  console.log(product);
  const {blurb, body, category, colors, images, price, qty, title, slug } = productSolver(product)
  return (
      <Container>
        <section className="mt-4 sm:mt-20 prose max-w-6xl mx-auto">
          <div className="p-4 flex">
              {
              images.map((image:any, index:number) => {
                return (
                  <a key={index} className="cursor-pointer">
                    <Image
                      alt="ss"
                      src={urlFor(image.asset._ref).width(400).height(500).url() || ""}
                      loading="lazy"
                      title={"ss"}
                      className="rounded-xl"
                      height={500}
                      width={400}
                    />
                  </a>
                )
              })
              }
            <div>
              sa
            </div>
          </div>
        </section>
      </Container>
  )
};



export const getStaticPaths: GetStaticPaths = async () => {
  const { slugsQuery } = productSlugsGroq()
  const { products } = await configuredSanityClient.fetch(slugsQuery);
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
  const { productQuery } = productGroq(slug)
  const { product } = await configuredSanityClient.fetch(productQuery);
  return {
    props: {
      product,
    },
  };
};

export default Slug;
