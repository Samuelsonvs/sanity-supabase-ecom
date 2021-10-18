/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { GetServerSideProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import configuredSanityClient from "@/utils/sanity";
import { productsSubCategory } from "@/utils/groqs";
import { subCategorySolver } from "@/utils/groqResolver";
import Container from "@/container/Container";

const subCategoryImages = {
  "Bedroom Sets":"/static/images/categories/sub/Bedroom/Bedroom_sets.jpg",
  "Bedroom Benches":"/static/images/categories/sub/Bedroom/Bedroom_benches.jpg",
  "Nightstands":"/static/images/categories/sub/Bedroom/Nightstands.jpg",
  "Makeup Table and Vanities":"/static/images/categories/sub/Bedroom/Makeup_vanities.jpg",
  "Kitchen & Dining Room Sets":"/static/images/categories/sub/Dining/Dining_room_sets.jpg",
  "Kitchen & Dining Tables":"/static/images/categories/sub/Dining/Dining_tables.jpg",
  "Recliners":"/static/images/categories/sub/Chairs/Recliners.jpg",
  "Accent Chairs":"/static/images/categories/sub/Chairs/Accent_chairs.jpg",
  "TV Stands & Entertainment Centers":"/static/images/categories/sub/TvStand/Tv_stands.jpg",
  "TV Trays":"/static/images/categories/sub/TvStand/Tv_trays.jpg"
}

const defImage = [
  "/static/images/categories/sub/Bedroom/Bedroom_sets.jpg"
]

export const Index = ({ subCategories, categories }: any) => {
  const router = useRouter();
  const routerQueryName = router.query.subCategory;
  const categoryId = categories.filter(
    (category: any) => category.slug.current === routerQueryName
  )[0]?._id;
  useEffect(() => {
    if (!categoryId) {
      router.replace("/");
    }
  }, []);
  return (
    <Container>
      <div className="mt-4 sm:mt-20 px-3 prose max-w-6xl mx-auto">
      <h1>Furniture -2 </h1>
      <ul className="sm:flex sm:flex-wrap sm:justify-evenly carousel gap-3 py-4 sm:py-8 sm:overflow-visible">
        {subCategories.map((category: any, idx: number) => {
          const { _ref, title, slug } = subCategorySolver(category)
          if (categoryId === _ref) {
            return (
              <li key={idx} className="cursor-pointer w-72 carousel-item rounded-md shadow-xl hover:shadow-2xl">
              <Link passHref href={`${router.asPath}/${slug}`}>
              <a className="flex px-1 space-x-5 items-center">
                <Image
                 src={subCategoryImages[title as keyof typeof subCategoryImages] ?? defImage[0]}
                 alt={"chairs"}
                 width={65}
                 height={65}
                 />
                 <div>{title}</div>
              </a>
              </Link>
            </li>
            );
          }
        })}
        </ul>
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { subCategoryQuery } = productsSubCategory()
  const { subCategories, categories } = await configuredSanityClient.fetch(
    subCategoryQuery
  );
  return {
    props: {
      subCategories,
      categories,
    },
  };
};

export default Index;
