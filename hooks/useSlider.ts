import { useState, useEffect, useRef, MutableRefObject } from "react";
import KeenSlider, { TOptionsEvents } from "keen-slider";

import { App } from "@/interfaces/app";

export function useSlider(
  ref: MutableRefObject<HTMLDivElement | null>,
  options?: TOptionsEvents
): App.SliderData {
  const sliderRef = useRef<KeenSlider | null>(null);
  const timer = useRef<any>();
  const [mounted, setMounted] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    sliderRef.current = new KeenSlider(ref.current, {
      ...options,
      mounted: () => setMounted(true),
      rubberband: false,
      slidesPerView: 1,
      slideChanged: (s) => {
        setActive(s.details().relativeSlide);
      },
    });

    return () => {
      sliderRef.current?.destroy();
      sliderRef.current = null;
    };
  }, []);

  // useEffect(() => {
  //     if (!ref.current) {
  //         return;
  //     };

  //     ref.current?.addEventListener("mouseover", () => {
  //         setPause(true)
  //     })
  //     ref.current?.addEventListener("mouseout", () => {
  //         setPause(false)
  //     })
  // }, [ref])

  useEffect(() => {
    timer.current = setInterval(() => {
      if (!pause && sliderRef) {
        sliderRef?.current?.next();
      }
    }, 3000);
    return () => {
      clearInterval(timer.current);
    };
  }, [pause, sliderRef]);

  return {
    mounted,
    active,
    next: () => sliderRef.current?.next(),
    prev: () => sliderRef.current?.prev(),
  };
}
