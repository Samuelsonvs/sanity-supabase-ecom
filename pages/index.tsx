import type { NextPage } from "next";
import configuredSanityClient from "@/utils/sanity";
import { GetStaticProps, GetStaticPropsContext } from "next";

import TopCarousel from "@/components/Home/TopCarousel";
import FeaturedProduct from "@/components/Home/FeaturedProduct";
import BambooProducts from "@/components/Home/BambooProducts";
import { GroqData } from "@/interfaces/groqData";
import Container from "@/container/Container";
import { productsGroq } from "@/utils/groqs";

const Home: NextPage<GroqData.Products> = ({ products }) => {
  console.log(products)
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

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { productsQuery } = productsGroq();
  const { products } = await configuredSanityClient.fetch(productsQuery);
  return {
    props: {
      products,
    },
    revalidate: 60,
  };
};

export default Home;
