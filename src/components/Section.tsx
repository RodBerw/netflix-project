"use client";

import { movieDTO } from "@/app/dtos/movieDTO";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import useEmblaCarousel from "embla-carousel-react";
import EmblaCarousel from "./EmblaCarousel";

interface Props {
  sectionName: string;
}

export default function Section({ sectionName }: Props) {
  // Embla reference for carousel
  const [emblaRef] = useEmblaCarousel();

  const [movies, setMovies] = useState<movieDTO[]>([]);

  useEffect(() => {
    //const loggedUserId = localStorage.getItem("userId");
    const loggedUserId = 7;
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJlbWFpbDJAZW1haWwuY29tIiwiaWF0IjoxNzI3ODA1NzQzLCJleHAiOjE3Mjc4MDY2NDN9.YbkoZMfMvrlHvI_ZTIREhQZIipzqLjxFzY5caxW9ul8"
    );
    axios
      .get(`/api/movie/?userId=${loggedUserId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log(res.data);
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col w-100">
      <h1>{sectionName}</h1>
      <EmblaCarousel movies={movies} />
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
