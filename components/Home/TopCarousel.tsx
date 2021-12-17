import React, { useRef, useState } from "react";
import Image from "next/image";

import { useSlider } from "@/hooks/useSlider";
import StaticImages from "@/constants/staticImages.json";

const TopCarousel = () => {
  const { topCarouselImages } = StaticImages;
  const [opacities, setOpacities] = useState<number[]>([]);
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);
  const ImagesJsonKeys = Object.keys(topCarouselImages);

  const { mounted, active, next, prev } = useSlider(sliderContainerRef, {
    slides: ImagesJsonKeys.length,
    loop: true,
    duration: 3000,
    move(s) {
      const new_opacities = s.details().positions.map((slide) => slide.portion);
      setOpacities(new_opacities);
    },
  });

  return (
    <section className="relative w-full max-w-screen-3xl mx-auto">
      <div
        ref={sliderContainerRef}
        className="relative h-96 sm:h-120 overflow-hidden"
      >
        {ImagesJsonKeys.map((imageKey, idx) => {
          return (
            <div
              key={idx}
              style={{ opacity: opacities[idx] }}
              className={`w-full h-full ${process.env.NEXT_PUBLIC_CAROUSEL_RELATIVE ?? "absolute"}`}
            >
              {" "}
              {/* prod absolute */}
              <Image
                src={
                  topCarouselImages[imageKey as keyof typeof topCarouselImages]
                }
                priority
                alt="crsl"
                objectFit="cover"
                layout="fill"
              />
            </div>
          );
        })}
      </div>
      <div className="absolute z-20 flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        {mounted && (
          <>
            <button onClick={next} className="btn btn-circle bg-opacity-70">
              ❮
            </button>
            <button onClick={prev} className="btn btn-circle bg-opacity-70">
              ❯
            </button>
          </>
        )}
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
