"use client";

import Section from "@/components/Section";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { movieDTO } from "../dtos/movieDTO";
import api from "@/utils/configAxios";
import MovieCard from "@/components/MovieCard";
import Banner from "@/components/Banner";

export default function Browse() {
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<movieDTO[]>([]);
  const [slidesCount, setSlidesCount] = useState(0);

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
          const ordenedMovies = [...filteredMovies].sort((a, b) =>
            a.id && b.id ? a.id - b.id : 0
          );
          setType(type);
          setMovies([...ordenedMovies]);
          return;
        } else if (search) {
          if (search == "my-list") {
            api
              .get(`/api/list/?userId=${localStorage.getItem("userId")}`)
              .then((res) => {
                if (!res.data) {
                  return;
                }

                console.log(res.data);
                const moviesId = JSON.parse(res.data.moviesId);

                // Create an array of promises to fetch each movie
                const movieRequests = moviesId.map((movieId: number) =>
                  api.get(`/api/movie/?id=${movieId}`).then((res) => {
                    return res.data as movieDTO;
                  })
                );

                // Wait for all promises to resolve and fill filteredMovies with the results
                Promise.all(movieRequests)
                  .then((filteredMovies: movieDTO[]) => {
                    setSearch(search);
                    setMovies(filteredMovies);
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
  }, [searchParams.get("type"), searchParams.get("search")]);

  const slidesPerPage = 6;

  useEffect(() => {
    const handleResize = () => {
      const count = Math.floor((slidesPerPage * innerWidth) / screen.width);
      setSlidesCount(count);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (type) {
    return (
      <div className="w-full overflow-hidden">
        <Banner movies={movies} />
        <div className="w-full flex flex-col gap-20 font-bold">
          <Section
            sectionName="Trending Now"
            moviesProps={(() => {
              const sortedMovies = [...movies].sort(() => Math.random() - 0.5);
              const first24Movies = sortedMovies.slice(0, 24);
              return first24Movies;
            })()}
            useMoviesProps={true}
          />
          <Section
            sectionName="Recently Added"
            moviesProps={(() => {
              const sortedMovies = [...movies].sort(() => Math.random() - 0.5);
              const first24Movies = sortedMovies.slice(0, 24);
              return first24Movies;
            })()}
            useMoviesProps={true}
          />
          <Section
            sectionName="Chosen for you"
            moviesProps={(() => {
              const sortedMovies = [...movies].sort(() => Math.random() - 0.5);
              const first24Movies = sortedMovies.slice(0, 24);
              return first24Movies;
            })()}
            useMoviesProps={true}
          />
          <Section
            sectionName="More"
            moviesProps={(() => {
              const sortedMovies = [...movies].sort(() => Math.random() - 0.5);
              const first24Movies = sortedMovies.slice(0, 24);
              return first24Movies;
            })()}
            useMoviesProps={true}
          />
        </div>
      </div>
    );
  } else if (search) {
    return (
      <div className="pt-52">
        <div
          className={`w-[92%] ml-[4%] mr-[4%] relative grid gap-[0.25vw] flex-wrap`}
          style={{
            gridTemplateColumns: `repeat(${slidesCount}, 1fr)`,
          }}
        >
          {movies.map((movie, key) => (
            <div
              key={key}
              className="w-full min-h-24 h-[7vw] mb-16 relative"
              style={{ zIndex: focusedIndex === key ? 20 : 0 }}
            >
              <MovieCard
                movie={movie}
                imageUrl={movie.imageUrl}
                setFocusedIndex={setFocusedIndex}
                setShowArrows={setShowArrows}
                index={key}
                xOffset={0}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
