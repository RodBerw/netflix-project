"use client";

import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { movieDTO } from "@/app/dtos/movieDTO";

type PropType = {
  movies: movieDTO[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { movies, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [showArrows, setShowArrows] = useState(false);
  const [slidesCount, setSlidesCount] = useState<number[]>([]);
  const [containersCount, setCountainersCount] = useState<number[]>([]);
  const size = useWindowSize();

  useEffect(() => {
    const count = Math.floor((6 * screen.width) / 1980);
    setSlidesCount(Array.from(Array(count).keys()));
    setCountainersCount(Array.from(Array(count - 1).keys()));
  }, [useWindo]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section
      className="embla"
      onMouseEnter={() => {
        setShowArrows(true);
      }}
      onMouseLeave={() => setShowArrows(false)}
    >
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {containersCount.map((container, index) => (
            <div
              className="embla__slide flex flex-row justify-around"
              key={index}
            >
              {slidesCount.map((slide, index) => (
                <div className="embla__slide__number">{index + 1}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default EmblaCarousel;
