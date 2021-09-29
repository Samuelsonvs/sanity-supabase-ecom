import React from "react";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import Link from "next/link";

import configuredSanityClient from "@/utils/sanity";

export const index = ({ categories }: any) => {
  console.log(1);
  return (
    <div>
      {categories.map((category: any, idx: number) => {
        return (
          <Link key={idx} passHref href={`/category/${category.slug.current}`}>
            <a className="block">{category.title}</a>
          </Link>
        );
      })}
    </div>
  );
};

const productsCategory = groq`{
    "categories":   *[_type == 'category' && parents == null]{
        title,
        slug
    }
}`;

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { categories } = await configuredSanityClient.fetch(productsCategory);
  return {
    props: {
      categories,
    },
    revalidate: 60,
  };
};

export default index;
