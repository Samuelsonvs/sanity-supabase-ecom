import type { NextPage } from "next";
import configuredSanityClient from "@/utils/sanity";
import { groq } from "next-sanity";
import { GetStaticProps, GetStaticPropsContext } from "next";

import TopCarousel from "@/components/Home/TopCarousel";
import FeaturedProduct from "@/components/Home/FeaturedProduct";
import BambooProducts from "@/components/Home/BambooProducts"
import { SanityProduct } from "@/interfaces/interface";
import Container from "@/container/Container";


const Home = ({ products }: SanityProduct) => {
  return (
    <Container>
      <>
        <TopCarousel />
        <FeaturedProduct products={products} />
        <BambooProducts products={products} />
      </>
    </Container>
  );
};

const productsQuery = groq`{
  "products":  *[_type == "product"] {
    blurb {
      en
    },
    body {
      en
    },
    categories,
    defaultProductVariant,
    slug {
      current
    },
    tags,
    category,
    variants,
    title
  },
}`;

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { products } = await configuredSanityClient.fetch(productsQuery);
  return {
    props: {
      products,
    },
    revalidate: 60,
  };
};

export default Home;
