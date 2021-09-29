import React, { useState } from 'react'
import Image from "next/image"

import { SanityProduct } from "@/interfaces/interface";
import { urlFor } from "@/utils/sanity";

const menuNames = [
    "Chair",
    "Bedroom",
    "Kitchen",
    "TV Stands"
]

export const BambooProducts = ({ products }: SanityProduct) => {
    const [selectedMenu, setSelectedMenu] = useState<number>(0)
    return (
        <section className="px-3 py-28 prose max-w-6xl mx-auto">
            <div>
                <h1 className="text-primary text-center">Bamboo Products</h1>
                <div>
                    <ul className="flex justify-evenly max-w-lg mx-auto">
                        {menuNames.map((name, idx) => {
                            return (
                                <li key={idx}>
                                    <button onClick={() => setSelectedMenu(idx)} className={`btn p-0 bg-white hover:bg-white text-primary ${idx === selectedMenu ? "btn-border-constant" : "btn-border"}`}>
                                        {name}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className="carousel-manuel gap-3 py-10">
                {Array.isArray(products) && 
                products.map((product:any, idx:number) => {
                    if (product.category === menuNames[selectedMenu]) {
                        const image = product.defaultProductVariant.images[0];
                        return (
                            <div key={idx} className={`carousel-item`}>
                                <Image
                                alt="ss"
                                src={urlFor(image).width(300).height(200).url() || ""}
                                loading="lazy"
                                title={"ss"}
                                className="rounded-2xl"
                                width={300}
                                height={200}
                                />         
                            </div> 
                        )
                    }
                })}
            </div>
        </section>
    )
}

export default BambooProducts