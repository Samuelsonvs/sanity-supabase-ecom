import React, { useState } from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/utils/sanity";
import configuredSanityClient from "@/utils/sanity";
import Container from "@/container/Container";
import { GroqData } from "@/interfaces/groqData";
import { productSolver } from "@/utils/groqResolver";
import { productGroq, productSlugsGroq } from "@/utils/groqs";

export const Slug = ({ product }: GroqData.Product) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const { blurb, body, category, colors, images, price, qty, title, slug } =
  productSolver(product);
  const len = images.length - 1
  console.log(product);

  const nextIndex = () => {
    const index =  currentIndex === len ? 0 : currentIndex + 1
    setCurrentIndex(index)
  }

  const prevIndex = () => {
    const index =  currentIndex === 0 ? len : currentIndex - 1
    setCurrentIndex(index)
  }

  return (
    <Container>
      <section className="mt-4 sm:mt-20 prose max-w-6xl mx-auto relative">
        <div className="flex flex-col">
          <div className="relative p-4 w-80 mx-auto sm:mx-0 sm:w-96">
            {images.map((image: any, index: number) => {
              return (
                  <div key={index} className={`${index === currentIndex ? "block" : "hidden"}`}>
                    <Image
                      alt="ss"
                      src={
                        urlFor(image.asset._ref).width(400).height(500).url() || ""
                      }
                      loading="lazy"
                      title={"ss"}
                      className="rounded-xl"
                      height={500}
                      width={400}
                    />
                  </div>
              );
            })}
            <div className="absolute z-20 flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <button
                onClick={prevIndex}
                className="btn btn-circle bg-opacity-70"
              >
                ❮
              </button>
              <button
                onClick={nextIndex}
                className="btn btn-circle bg-opacity-70"
              >
                ❯
              </button>
            </div>
            </div>
            <div className="flex w-80 sm:w-96 space-x-2 mx-auto sm:mx-0 justify-center">
              {images.map((image: any, index: number) => {
                return (
                    <a key={index} className={`flex rounded-2xl overflow-hidden border-4 border-transparent ${currentIndex === index ? "border-yellow-600" : ""}`}>
                      <Image
                        alt="ss"
                        src={
                          urlFor(image.asset._ref).width(100).height(100).url() || ""
                        }
                        title={"ss"}
                        className="rounded-xl"
                        height={100}
                        width={100}
                      />
                    </a>
                );
              })}
            </div>
        </div>
        
      </section>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { slugsQuery } = productSlugsGroq();
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
  const { productQuery } = productGroq(slug);
  const { product } = await configuredSanityClient.fetch(productQuery);
  return {
    props: {
      product,
    },
  };
};

export default Slug;
