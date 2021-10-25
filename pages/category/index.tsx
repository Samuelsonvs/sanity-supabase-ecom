import React from "react";
import type { NextPage } from "next";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import Image from "next/image";

import configuredSanityClient from "@/utils/sanity";
import Container from "@/container/Container";
import { productsTopCategory } from "@/utils/groqs";
import { topCategorySolver } from "@/utils/groqResolver";
import { GroqData } from "@/interfaces/groqData";
import { categoryImages, defImage } from "@/constants/staticImages";

export const Index: NextPage<GroqData.TopCategory> = ({ categories }) => {
  return (
    <Container>
      <div className="mt-4 sm:mt-20 px-3 prose max-w-6xl mx-auto">
        <h1>Furniture</h1>
          <ul className="sm:flex sm:flex-wrap sm:justify-evenly carousel gap-3 py-4 sm:py-8 sm:overflow-visible">
            {Array.isArray(categories) && categories.map((category: any, idx: number) => {
              const { title, slug } = topCategorySolver(category)
              return (
                <li key={idx} className="cursor-pointer w-72 carousel-item rounded-md shadow-xl hover:shadow-2xl">
                  <Link passHref href={`/category/${slug}`}>
                  <a className="flex px-1 space-x-5 items-center">
                    <Image
                     src={categoryImages[title as keyof typeof categoryImages] ?? defImage[0]}
                     alt={"chairs"}
                     width={65}
                     height={65}
                     />
                     <div>{title}</div>
                  </a>
                  </Link>
                </li>
              );
            })}
          </ul>
      </div>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { topCategoryQuery } = productsTopCategory()
  const { categories } = await configuredSanityClient.fetch(topCategoryQuery);
  return {
    props: {
      categories,
    },
    revalidate: 60,
  };
};

export default Index;
