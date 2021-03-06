import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { GroqData } from "@/interfaces/groqData";
import { sanityImage } from "@/utils/sanity";
import { productSolver } from "@/utils/groqResolver";

const menuNames = ["Chair", "Bedroom", "Kitchen", "TV Stands"];

export const BambooProducts = ({ products }: GroqData.Products) => {
  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  return (
    <section className="px-3 py-28 prose max-w-6xl mx-auto">
      <div>
        <h1 className="text-primary text-center">Bamboo Products</h1>
        <div>
          <ul className="flex justify-evenly max-w-lg mx-auto">
            {menuNames.map((name, idx) => {
              return (
                <li key={idx}>
                  <button
                    onClick={() => setSelectedMenu(idx)}
                    className={`btn p-0 bg-white hover:bg-white text-primary ${
                      idx === selectedMenu
                        ? "btn-border-constant"
                        : "btn-border"
                    }`}
                  >
                    {name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="carousel-manuel gap-3 py-10">
        {Array.isArray(products) &&
          products.map((product: any, idx: number) => {
            const { images, slug, category } = productSolver(product);
            if (category === menuNames[selectedMenu]) {
              const image = images[0];
              return (
                <Link key={idx} passHref href={`/product/${slug}`}>
                  <a className="carousel-item">
                    <Image
                      alt="ss"
                      src={sanityImage(image, 300, 200) || ""}
                      loading="lazy"
                      title={"ss"}
                      className="rounded-2xl"
                      width={300}
                      height={200}
                    />
                  </a>
                </Link>
              );
            }
          })}
      </div>
    </section>
  );
};

export default BambooProducts;
