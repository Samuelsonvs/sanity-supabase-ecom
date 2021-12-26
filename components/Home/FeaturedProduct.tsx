import { useState } from "react";

import { GroqData } from "@/interfaces/groqData";
import { productSolver } from "@/utils/groqResolver";
import { ProductImage } from "../ProductImage";

export const FeaturedProduct = ({ products }: GroqData.Products) => {
  const [sliceNumber, setSliceNumber] = useState<number>(9);
  const productsLength = products.length;
  return (
    <section className="prose max-w-6xl mx-auto mt-10">
      <h1 className="w-full text-center">Featured Product</h1>
      <div className="px-2 py-10 grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(products) &&
          products.slice(0, sliceNumber).map((product: any, idx: number) => {
            const { images, slug, price, title, _id } = productSolver(product);
            const image = images[0];
            return (
              <ProductImage
                key={idx}
                _id={_id}
                slug={slug}
                image={image}
                price={price}
                title={title}
                width={400}
                height={500}
                hoverCss={
                  "transition transform -translate-y-14 ease-in-out duration-150 hover:-translate-y-28"
                }
                containerCss={`${
                  idx === 1 || idx % 2 === 1
                    ? "sm:mt-20 sm:-mb-20"
                    : "sm:mt-0 sm:mb-0"
                } ${
                  idx === 1 || idx % 3 === 1
                    ? "lg:mt-20 lg:-mb-20"
                    : "lg:mt-0 lg:mb-0"
                }`}
              />
            );
          })}
      </div>
      <div className="flex justify-center mt-20">
        <button
          type="button"
          disabled={productsLength <= sliceNumber ? true : false}
          className="btn btn-primary rounded-3xl px-10 bg-yellow-600 hover:bg-yellow-700"
          onClick={() => setSliceNumber(sliceNumber + 3)}
        >
          Load More
        </button>
      </div>
    </section>
  );
};

export default FeaturedProduct;
