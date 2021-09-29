/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { GetServerSideProps, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import Link from "next/link";
import { useRouter } from "next/router";

import configuredSanityClient from "@/utils/sanity";

export const Index = ({ subCategories, categories }: any) => {
  const router = useRouter();
  const routerName = router.query.subCategory;
  const categoryId = categories.filter(
    (category: any) => category.slug.current === routerName
  )[0]?._id;
  console.log(2);
  useEffect(() => {
    if (!categoryId) {
      router.replace("/");
    }
  }, []);
  return (
    <div>
      {subCategories.map((category: any, idx: number) => {
        if (categoryId === category.parents[0]._ref) {
          return (
            <Link
              key={idx}
              passHref
              href={`${router.asPath}/${category.slug.current}`}
            >
              <a className="block">{category.title}</a>
            </Link>
          );
        }
      })}
    </div>
  );
};

const productsCategory = groq`{
    "categories":   *[_type == 'category' && parents == null]{
        _id,
        slug {
            current
        }
    },
    "subCategories": *[_type == 'category' && parents != null ]{
        title,
        parents,
        slug {
            current
        },
        _id
    }
}`;

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { subCategories, categories } = await configuredSanityClient.fetch(
    productsCategory
  );
  return {
    props: {
      subCategories,
      categories,
    },
  };
};

export default Index;
