import React from "react";

import { GroqData } from "@/interfaces/groqData";
import { productSolver } from "@/utils/groqResolver";
import { ProductImage } from "../ProductImage";

const RelatedProduct = ({ relatedProducts }: GroqData.Product) => {
  return (
    <>
      <div className="prose py-10 text-center mx-auto">
        <h1 className="text-primary">Related Product</h1>
      </div>
      <div className="carousel-manuel gap-3 py-10 mb-10 prose max-w-6xl mx-auto">
        {Array.isArray(relatedProducts) &&
          relatedProducts.slice(0, 5).map((product: any, idx: number) => {
            const { images, slug, price, title } = productSolver(product);
            const image = images[0];
            return (
              <ProductImage
                key={idx}
                slug={slug}
                image={image}
                price={price}
                title={title}
                width={300}
                height={400}
                hoverCss={
                  "bottom-0 transition transform translate-y-20 ease-in-out duration-150 hover:translate-y-6"
                }
                containerCss={"carousel-item"}
              />
            );
          })}
      </div>
    </>
  );
};

export default RelatedProduct;
