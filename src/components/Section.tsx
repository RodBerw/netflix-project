"use client";

import { movieDTO } from "@/app/dtos/movieDTO";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import useEmblaCarousel from "embla-carousel-react";
import EmblaCarousel from "./EmblaCarousel";
import api from "@/utils/configAxios";

interface Props {
  sectionName: string;
  moviesProps: movieDTO[];
  useMoviesProps: boolean;
}

export default function Section({
  sectionName,
  moviesProps,
  useMoviesProps,
}: Props) {
  const [movies, setMovies] = useState<movieDTO[]>([]);
  const [showArrows, setShowArrows] = useState(false);
  const [zIndex, setZIndex] = useState(0);

  useEffect(() => {
    if (useMoviesProps) {
      setMovies(moviesProps);
      return;
    }

    const loggedUserId = localStorage.getItem("userId");

    api
      .get(`/api/movie/`)
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      className="flex flex-col w-full"
      style={{ zIndex: zIndex, maxHeight: "184px" }}
      onMouseEnter={() => {
        setShowArrows(true);
        setZIndex(10);
      }}
      onMouseLeave={() => {
        setShowArrows(false);
        setZIndex(0);
      }}
    >
      <h1 className="md:text-medium lg:text-[1.4vw] mb-[1vw] ml-[3vw] mr-[3vw]">
        {sectionName}
      </h1>
      <EmblaCarousel
        movies={movies}
        options={{ loop: true }}
        showArrows={showArrows}
        setShowArrows={setShowArrows}
      />
      {/* <div className="embla__container w-1/4 flex">
        <div className="embla__slide" style={{ flex: "0 0 100%" }}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movieUrl={movie.imageUrl}
              movieTitle={movie.title}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
}
