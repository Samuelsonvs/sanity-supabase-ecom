import React, { ChangeEvent, useState } from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Image from "next/image";
import type { NextPage } from "next";

import { urlFor } from "@/utils/sanity";
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

export const Slug: NextPage<GroqData.Product> = ({ product, relatedProducts }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState<GroqData.VariantItems>({
    body:null,
    Color:null,
    images:null,
    price:null,
    qty:null,
    title:null,
    _key:null
  })
  const [inputQty, setInputQty] = useState<number>(1);
  const { blurb, body, category, Color, colors, images, price, qty, title, variants, slug, _id } =
    productSolver(product);
  const len = images.length - 1;

  const { text } = bodySolver(body[0]);

  const handleArrows = (event: string) => {
    if (event === "right") {
      const index = currentIndex === len ? 0 : currentIndex + 1;
      setCurrentIndex(index);
    } else {
      if (event === "left") {
        const index = currentIndex === 0 ? len : currentIndex - 1;
        setCurrentIndex(index);
      } else {
        console.log("Undefined event.")
      }
    }
  }

  const sendToBasket = () => {
    const isVariant = currentItems._key
    console.log({_id, isVariant, count: inputQty})
  }

  const tumbHandle = (index: number) => {
    setCurrentIndex(index);
  };

  const handleQtyNumber = (operator: string) => {
    if (operator === "+") {
      const number = inputQty === qty ? inputQty : inputQty + 1;
      setInputQty(number);
    } else {
      if (operator === "-") {
        const number = inputQty === 1 ? inputQty : inputQty - 1;
        setInputQty(number);
      } else {
        console.log("Undefined operator.")
      }
    }
  }

  const handleQtyInput = (e: ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value > qty ? qty : Number(e.target.value);
    setInputQty(number);
  };

  const variantHandler = (index: number) => {
    const { Color, images, qty, price, title, _key } = variantSolver(variants[index])
    setCurrentItems({
      ...currentItems, Color:Color.hex, images, qty, price, title, _key
    })
  }

  const variantReset = () => {
    setCurrentItems({
      ...currentItems,    
      body:null,
      Color:null,
      images:null,
      price:null,
      qty:null,
      title:null,
      _key: null
    })
  }

  return (
    <Container>
      <>
        <section className="mt-4 sm:mt-20 prose max-w-6xl mx-auto relative">
          <div className="flex flex-col md:flex-row space-x-10">
            <div className="flex flex-col">
              <div className="relative p-4 w-80 mx-auto md:mx-0 sm:w-96">
                {(currentItems.images ?? images).map((image: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        index === currentIndex ? "block" : "hidden"
                      }`}
                    >
                      <Image
                        alt="ss"
                        src={
                          urlFor(image.asset._ref)
                            .width(400)
                            .height(500)
                            .url() || ""
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
                {(currentItems.images ?? images).map((image: any, index: number) => {
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
                        src={
                          urlFor(image.asset._ref)
                            .width(100)
                            .height(100)
                            .url() || ""
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
            <div className="p-4 prose-sm">
              <h2>{currentItems.title ?? title}</h2>
              <div>
                <h3>${currentItems.price ?? price}</h3>
                <p>
                  <span>Available :</span>
                  <span>{(currentItems.qty ?? qty) > 0 ? " In Stock" : "Not Avaliable"}</span>
                </p>
                <p>{text}</p>
                <h3>Color</h3>
                <ul className="flex space-x-2">
                  <li
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: `${Color.hex}` }}
                  >
                    <button onClick={variantReset} className="flex pr-0 rounded-full"></button>
                  </li>
                  {variants && variants.map((variant:any, index:number) => {
                    return (
                      <li key={index}
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: `${variant.Color.hex}` }}
                      ><button onClick={() => variantHandler(index)} className="flex pr-0 rounded-full"></button>
                      </li>
                    )
                  })}
                </ul>
                <div className="flex space-x-5 lg:space-x-20">
                  <div>
                    <label htmlFor="qty" className="font-bold">
                      QTY
                    </label>
                    <div className="inline ml-3 py-2 border rounded-3xl">
                      <button onClick={() => handleQtyNumber("-")}>-</button>
                      <input
                        id="qty"
                        type="number"
                        onChange={(e) => handleQtyInput(e)}
                        value={inputQty}
                        min="1"
                        max={currentItems.qty ?? qty}
                        step="1"
                        className="w-5"
                      />
                      <button onClick={() => handleQtyNumber("+")}>+</button>
                    </div>
                  </div>
                  <button onClick={sendToBasket} className="btn btn-primary rounded-3xl px-2 sm:px-5 lg:px-10 bg-yellow-600 hover:bg-yellow-700">
                    <svg
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="0"
                        fill="#fff"
                        d="M6.4 3.2H32L27.2 17.6H6.4C5.97565 17.6 5.56869 17.7686 5.26863 18.0686C4.96857 18.3687 4.8 18.7757 4.8 19.2C4.8 19.6243 4.96857 20.0313 5.26863 20.3314C5.56869 20.6314 5.97565 20.8 6.4 20.8H27.2V24H6.4C5.12696 24 3.90606 23.4943 3.00589 22.5941C2.10571 21.6939 1.6 20.473 1.6 19.2C1.6 17.927 2.10571 16.7061 3.00589 15.8059C3.90606 14.9057 5.12696 14.4 6.4 14.4H6.928L4.8 8L3.2 3.2H0V0H4.8C5.22435 0 5.63131 0.168571 5.93137 0.468629C6.23143 0.768687 6.4 1.17565 6.4 1.6V3.2ZM8 32C7.15131 32 6.33737 31.6629 5.73726 31.0627C5.13714 30.4626 4.8 29.6487 4.8 28.8C4.8 27.9513 5.13714 27.1374 5.73726 26.5373C6.33737 25.9371 7.15131 25.6 8 25.6C8.84869 25.6 9.66263 25.9371 10.2627 26.5373C10.8629 27.1374 11.2 27.9513 11.2 28.8C11.2 29.6487 10.8629 30.4626 10.2627 31.0627C9.66263 31.6629 8.84869 32 8 32ZM24 32C23.1513 32 22.3374 31.6629 21.7373 31.0627C21.1371 30.4626 20.8 29.6487 20.8 28.8C20.8 27.9513 21.1371 27.1374 21.7373 26.5373C22.3374 25.9371 23.1513 25.6 24 25.6C24.8487 25.6 25.6626 25.9371 26.2627 26.5373C26.8629 27.1374 27.2 27.9513 27.2 28.8C27.2 29.6487 26.8629 30.4626 26.2627 31.0627C25.6626 31.6629 24.8487 32 24 32Z"
                      />
                    </svg>
                    <span className="ml-1 sm:ml-3">shop now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <Description body={currentItems.body ?? body}/>
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
