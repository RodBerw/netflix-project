"use client";

import React, { use, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { movieDTO } from "@/app/dtos/movieDTO";
import MovieCard from "./MovieCard";

type PropType = {
  movies: movieDTO[];
  options?: EmblaOptionsType;
  showArrows: boolean;
  setShowArrows: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { movies, options, showArrows, setShowArrows } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [slidesCount, setSlidesCount] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [slided, setSlided] = useState(false);

  let movieIndex = 0;
  let slidesPerPage = 7;

  let {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, slidesCount);

  useEffect(() => {
    const handleResize = () => {
      const count = Math.floor((slidesPerPage * innerWidth) / screen.width);
      setSlidesCount(count);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="embla !m-0 " style={{ pointerEvents: "none" }}>
      <div
        className="embla__viewport"
        ref={emblaRef}
        // style={{ marginLeft: `${slided ? "0" : "2%"}` }}
      >
        <div className="embla__container">
          {movies.map((movie, index) => {
            const i = movieIndex;
            movieIndex = (movieIndex + 1) % movies.length;
            return (
              <div
                className="embla__slide flex flex-nowrap w-full h-32"
                style={{
                  flex: `0 0 ${100 / slidesCount}%`,
                  zIndex: focusedIndex === index ? 20 : 0,
                }}
                key={index}
              >
                <MovieCard
                  movie={movies[i]}
                  imageUrl={movies[i]?.imageUrl}
                  setShowArrows={setShowArrows}
                  xOffset={
                    // (index + slidesCount.length) % slidesCount.length == 0
                    //   ? 25
                    //   : 0
                    0
                  }
                  setFocusedIndex={setFocusedIndex}
                  index={index}
                />
              </div>
            );
          })}
        </div>
      </div>

      {showArrows && (
        <div className="embla__controls">
          <div className="embla__buttons">
            {slided && (
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
            )}
            <NextButton
              onClick={() => {
                setSlided(true);
                onNextButtonClick();
              }}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default EmblaCarousel;
