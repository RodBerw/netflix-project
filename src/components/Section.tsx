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
}

export default function Section({ sectionName }: Props) {
  const [movies, setMovies] = useState<movieDTO[]>([]);

  useEffect(() => {
    const loggedUserId = localStorage.getItem("userId");

    api
      .get(`/api/movie/?userId=${loggedUserId}`)
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col w-100">
      <h1>{sectionName}</h1>
      <EmblaCarousel movies={movies} options={{ loop: true }} />
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
