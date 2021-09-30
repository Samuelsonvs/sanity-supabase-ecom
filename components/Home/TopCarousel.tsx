import React, { useState } from "react";
import Image from "next/image";


const images = [
  "/static/images/carousel/carousel1.jpg",
  "/static/images/carousel/carousel2.jpg",
  "/static/images/carousel/carousel3.jpg",
  "/static/images/carousel/carousel4.jpg"
]

export const TopCarousel = () => {
  const [current, setCurrent] = useState<number>(0)
  const len = images.length

  const handlerPrev = () =>  {
    if (current - 1 === -1) {
      setCurrent(len - 1)
    } else {
      setCurrent(current - 1)
    }
  }

  const handlerNext = () => {
    if (current + 1 === len) {
      setCurrent(0)
    } else {
      setCurrent(current + 1)
    }
  }

  return (
      <section className="relative w-full carousel max-w-screen-3xl mx-auto">
        {images.map((image, idx) => {
          return (
            <div key={idx} className={`relative w-full h-96 sm:h-full carousel-item transition transform duration-200 ease-in-out ${idx === current ? "" : "hidden"}`}>
              <Image
              src={image}
              alt="crsl"
              objectFit="cover"
              width="1920"
              height="1070"
                />
            </div>
          )
        })}
        <div className="absolute z-20 flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <button onClick={() => handlerPrev()} className="btn btn-circle bg-opacity-70">❮</button> 
          <button onClick={() => handlerNext()} className="btn btn-circle bg-opacity-70">❯</button>
        </div>
        <div className="hidden md:block prose-sm lg:prose-lg absolute z-10 w-full top-20 lg:top-14 text-center text-primary">
          <hgroup>
            <h2 className="-mt-10 uppercase">Indoors</h2>
            <h1 className="mt-5">
              See Bamboo&apos;s New Range Of Indoor Furniture
            </h1>
          </hgroup>
          <div className="mt-10">
            <p>Classic meet modern living</p>
            <p>Bamboo has a fantastic range of indoor furniture</p>
            <p>perfect for any modern home</p>
          </div>
          <button className="btn btn-primary rounded-3xl px-10 bg-yellow-600 hover:bg-yellow-700">
            button
          </button>
        </div>
      </section> 
  );
};

export default TopCarousel;