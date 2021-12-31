import React, { ChangeEvent, useState } from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Image from "next/image";
import type { NextPage } from "next";

import { sanityImage } from "@/utils/sanity";
import configuredSanityClient from "@/utils/sanity";
import Container from "@/container/Container";
import { GroqData } from "@/interfaces/groqData";
import { productSolver, bodySolver, variantSolver } from "@/utils/groqResolver";
import {
  productGroq,
  productSlugsGroq,
  relatedProductGroq,
} from "@/utils/groqs";
import RelatedProduct from "@/components/ProductDetail/RelatedProduct";
import Description from "@/components/ProductDetail/Description";
import UseBasket from "@/utils/basket";
import { useUser } from "@/contexts/AuthContext";
import QtyHandler from "@/components/QtyHandler";
import BasketSVG from "@/public/static/svg/basketButton.svg";

export const Slug: NextPage<GroqData.Product> = ({
  product,
  relatedProducts,
}) => {
  const { user, basket, setBasket } = useUser();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState<GroqData.VariantItems>({
    body: null,
    Color: null,
    images: null,
    price: null,
    qty: null,
    title: null,
    _key: null,
  });
  const [inputQty, setInputQty] = useState<number>(1);
  const {
    blurb,
    body,
    category,
    Color,
    colors,
    images,
    price,
    qty,
    title,
    variants,
    slug,
    _id,
  } = productSolver(product);
  const len = images.length - 1;

  const { text } = bodySolver(body[0]);

  const directions = {
    right: [len, 0, "+"],
    left: [0, len, "-"],
  };

  const handleArrows = (event: string) => {
    const currentDirection = directions[event as keyof typeof directions];
    if (currentDirection !== undefined) {
      const index =
        currentIndex === currentDirection[0]
          ? currentDirection[1]
          : eval(`${currentIndex} ${currentDirection[2]} 1 `);
      setCurrentIndex(index);
    } else {
      console.log("Undefined event.");
    }
  };

  const sendToBasket = async () => {
    const isVariant = currentItems._key;
    if (user) {
      const { result } = await UseBasket({
        _id,
        isVariant,
        count: inputQty,
        method: "ADD",
        user,
        basket,
        setBasket,
      });
      result && console.log(result);
    }
  };

  const tumbHandle = (index: number) => {
    setCurrentIndex(index);
  };

  const variantHandler = (index: number) => {
    const { Color, images, qty, price, title, _key } = variantSolver(
      variants[index]
    );
    setCurrentItems({
      ...currentItems,
      Color: Color.hex,
      images,
      qty,
      price,
      title,
      _key,
    });
  };

  const variantReset = () => {
    setCurrentItems({
      ...currentItems,
      body: null,
      Color: null,
      images: null,
      price: null,
      qty: null,
      title: null,
      _key: null,
    });
  };

  return (
    <Container>
      <>
        <section className="mt-4 prose max-w-6xl mx-auto relative">
          <div className="flex flex-col md:flex-row space-x-10">
            <div className="flex flex-col">
              <div className="relative p-4 w-80 mx-auto md:mx-0 sm:w-96">
                {(currentItems.images ?? images).map(
                  (image: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className={`${
                          index === currentIndex ? "block" : "hidden"
                        }`}
                      >
                        <Image
                          alt="ss"
                          src={sanityImage(image.asset._ref, 400, 500) || ""}
                          loading="lazy"
                          title={"ss"}
                          className="rounded-xl"
                          height={500}
                          width={400}
                        />
                      </div>
                    );
                  }
                )}
                <div className="absolute z-20 flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <button
                    onClick={() => handleArrows("left")}
                    className="btn btn-circle bg-opacity-70"
                  >
                    ❮
                  </button>
                  <button
                    onClick={() => handleArrows("right")}
                    className="btn btn-circle bg-opacity-70"
                  >
                    ❯
                  </button>
                </div>
              </div>
              <div className="flex w-80 sm:w-96 space-x-2 mx-auto sm:mx-0 justify-center">
                {(currentItems.images ?? images).map(
                  (image: any, index: number) => {
                    return (
                      <a
                        key={index}
                        onClick={() => tumbHandle(index)}
                        className={`flex rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent ${
                          currentIndex === index ? "border-yellow-600" : ""
                        }`}
                      >
                        <Image
                          alt="ss"
                          src={sanityImage(image.asset._ref, 100, 100) || ""}
                          title={"ss"}
                          className="rounded-xl"
                          height={100}
                          width={100}
                        />
                      </a>
                    );
                  }
                )}
              </div>
            </div>
            <div className="p-4 prose-sm">
              <h2>{currentItems.title ?? title}</h2>
              <div>
                <h3>$ {currentItems.price ?? price}</h3>
                <p>
                  <span>Available :</span>
                  <span>
                    {(currentItems.qty ?? qty) > 0
                      ? " In Stock"
                      : " Not Avaliable"}
                  </span>
                </p>
                <p>{text}</p>
                <h3>Color</h3>
                <ul className="flex space-x-2">
                  <li
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: `${Color.hex}` }}
                  >
                    <button
                      title="Variant"
                      type="button"
                      onClick={variantReset}
                      className="flex pr-0 rounded-full"
                    ></button>
                  </li>
                  {variants &&
                    variants.map((variant: any, index: number) => {
                      return (
                        <li
                          key={index}
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: `${variant.Color.hex}` }}
                        >
                          <button
                            title="Variant"
                            type="button"
                            onClick={() => variantHandler(index)}
                            className="flex pr-0 rounded-full"
                          ></button>
                        </li>
                      );
                    })}
                </ul>
                <div className="flex space-x-5 lg:space-x-20">
                  <div>
                    <label htmlFor="qty" className="font-bold">
                      QTY
                    </label>
                    <QtyHandler
                      setter={setInputQty}
                      inputQty={qty === 0 ? 0 : inputQty}
                      qty={qty}
                      min={1}
                      max={currentItems.qty ?? qty}
                      step={1}
                      css={"w-5"}
                      containerCss={"inline-block ml-3 border"}
                    />
                  </div>
                  <button
                    disabled={qty === 0 && true}
                    title="Add basket"
                    type="button"
                    onClick={sendToBasket}
                    className="btn btn-primary rounded-3xl px-2 sm:px-5 lg:px-10 bg-yellow-600 hover:bg-yellow-700"
                  >
                    <BasketSVG className="w-4 h-4" />
                    <span className="ml-1 sm:ml-3">shop now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <Description body={currentItems.body ?? body} />
        </section>
        <section>
          <RelatedProduct relatedProducts={relatedProducts} />
        </section>
      </>
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
  const category = product[0].category.toString().trim();
  const { relatedQuery } = relatedProductGroq(category, slug);
  const { relatedProducts } = await configuredSanityClient.fetch(relatedQuery);
  return {
    props: {
      product,
      relatedProducts,
    },
  };
};

export default Slug;
