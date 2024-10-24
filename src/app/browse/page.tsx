"use client";

import Section from "@/components/Section";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { movieDTO } from "../dtos/movieDTO";
import api from "@/utils/configAxios";
import MovieCard from "@/components/MovieCard";

export default function Browse() {
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<movieDTO[]>([]);

  // Disabled
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const type = searchParams.get("type") as string;
    const search = searchParams.get("search") as string;

    api
      .get("/api/movie")
      .then((response) => {
        const data = response.data as movieDTO[];

        if (type) {
          const filteredMovies = data.filter((movie) => movie.type === type);
          setType(type);
          setMovies(filteredMovies);
          return;
        } else if (search) {
          if (search == "my-list") {
            api
              .get(`/api/list/?userId=${localStorage.getItem("userId")}`)
              .then((res) => {
                const moviesId = res.data.moviesId;

                // Create an array of promises to fetch each movie
                const movieRequest = moviesId.map((movieId: number) =>
                  api
                    .get(`/api/movie/?id=${movieId}`)
                    .then((res) => res.data as movieDTO)
                );

                // Wait for all promises to resolve and fill filteredMovies with the results
                Promise.all(movieRequest)
                  .then((filteredMovies: movieDTO[]) => {
                    setSearch(search);
                    setMovies(filteredMovies);
                    console.log(movies);
                  })
                  .catch((error) => {
                    console.error("Error fetching movies:", error);
                  });
              });
          } else {
            const filteredMovies = data.filter((movie) =>
              movie.title.toLowerCase().includes(search.toLowerCase())
            );
            setSearch(search);
            setMovies(filteredMovies);
            return;
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  if (type) {
    return (
      <div className="w-full flex flex-col gap-20 font-bold">
        <Section
          sectionName="Trending Now"
          moviesProps={movies.sort(() => Math.random() - 0.5)}
          useMoviesProps={true}
        />
        <Section
          sectionName="Recentrly Added"
          moviesProps={movies.sort(() => Math.random() - 0.5)}
          useMoviesProps={true}
        />
        <Section
          sectionName="More"
          moviesProps={movies.sort(() => Math.random() - 0.5)}
          useMoviesProps={true}
        />
      </div>
    );
  } else if (search) {
    return (
      <div className="w-full flex flex-col gap-20 font-bold">
        <div className="w-full flex gap-[2%]">
          {movies.map((movie, key) => (
            <MovieCard
              key={key}
              movie={movie}
              imageUrl={movie.imageUrl}
              setFocusedIndex={setFocusedIndex}
              setShowArrows={setShowArrows}
              index={key}
              xOffset={0}
            />
          ))}
        </div>
      </div>
    );
  }
}
