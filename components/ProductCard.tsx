import React from "react";
import Image from "next/image";
import Link from "next/link";

import { sanityImage } from "@/utils/sanity";
import { App } from "@/interfaces/app";

export const ProductCard = ({ image, href, title }: App.Prop) => {
  return (
    <div className="card prose text-center shadow-2xl w-80 mx-auto sm:mx-0">
      <figure className="px-10">
        <Image
          alt="ss"
          src={sanityImage(image, 200, 300) || ""}
          loading="lazy"
          title={"ss"}
          className="rounded-xl"
          height={300}
          width={200}
        />
      </figure>
      <div className="card-body justify-between">
        <h3 className="card-title">{title}</h3>
        <p>colors</p>
        <div className="justify-center items-end card-actions pb-2 text-white">
          <Link passHref href={href}>
            <a className="btn btn-warning">More info</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
