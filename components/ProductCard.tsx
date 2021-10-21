import React from 'react'
import Image from "next/image"
import Link from "next/link"

import { urlFor } from '@/utils/sanity'

interface Prop {
    image: string;
    href: string
}

export const ProductCard = ({image, href}: Prop) => {
    return (
        <div className="card prose text-center shadow-2xl w-80">
        <figure className="px-10">
            <Image
                alt="ss"
                src={
                    urlFor(image)
                    .width(200)
                    .height(300)
                    .url() || ""
                }
                loading="lazy"
                title={"ss"}
                className="rounded-xl"
                height={300}
                width={200}
                />
        </figure> 
        <div className="card-body">
            <h2 className="card-title">shadow, center, padding</h2> 
            <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae voluptates incidunt iure sapiente.</p> 
            <div className="justify-center card-actions">
            <Link passHref href={href}>
                <a className="btn btn-outline btn-accent">More info</a>
            </Link>
            </div>
        </div>
        </div> 
    )
}

export default ProductCard