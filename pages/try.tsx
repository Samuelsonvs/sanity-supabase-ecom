import React from "react";
import configuredSanityClient from "@/utils/sanity";
import { groq } from "next-sanity";
import { GetStaticProps, GetStaticPropsContext } from "next";

export const Try = ({ categories }: any) => {
  categories.map((s: any) => console.log(s.slug.current));
  return <div></div>;
};

const productsCategory = groq`{
    "categories":  *[_type == 'category' && parents == null]
}`;

const productsQuery = groq`{
    "products":  *[_type == "product"]
  }`;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await configuredSanityClient.fetch(productsCategory),
});

export default Try;

// parent _ref == _id
