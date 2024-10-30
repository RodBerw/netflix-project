"use client";

import React, { createContext, useEffect, useState } from "react";
import DetailsModal from "./DetailsModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { movieDTO } from "@/app/dtos/movieDTO";
import api from "@/utils/configAxios";
import CreateModal from "./CreateModal";

export const ModalContext = createContext<{
  isDetailModalOpen: boolean;
  isCreateModalOpen: boolean;
  setIsDetailModalOpen: (value: boolean) => void;
  setIsCreateModalOpen: (value: boolean) => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
}>({
  isDetailModalOpen: false,
  isCreateModalOpen: false,
  setIsDetailModalOpen: () => {},
  setIsCreateModalOpen: () => {},
  setSearch: () => {},
  setType: () => {},
});

export const ModalProiver: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [movie, setMovie] = useState<movieDTO>({
    userId: 0,
    title: "",
    description: "",
    director: "",
    genre: "",
    releaseDate: new Date(),
    imageUrl: "",
    type: "movie",
  });
  const [movieId, setMovieId] = useState(0);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Check if the URL has a query parameter to open a modal
  useEffect(() => {
    // Open create modal
    if (searchParams.get("add") === "true") {
      setIsCreateModalOpen(true);
      return;
    }

    // Open detail modal
    const movieId = parseInt(searchParams.get("id") as string);

    if (isNaN(movieId)) return;

    setMovieId(movieId);

    try {
      api.get(`/api/movie/?id=${movieId}`).then((res) => {
        setIsDetailModalOpen(true);
        setMovie(res.data);
      });
    } catch (err) {
      console.error(err);
    }
  }, [searchParams]);

  // Disable scrolling when a modal is open
  useEffect(() => {
    if (isCreateModalOpen || isDetailModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCreateModalOpen, isDetailModalOpen]);

  // Set the userId of the movie to the current user
  useEffect(() => {
    movie.userId = parseInt(localStorage.getItem("userId") as string);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isDetailModalOpen,
        isCreateModalOpen,
        setIsCreateModalOpen,
        setIsDetailModalOpen,
        setSearch,
        setType,
      }}
    >
      {children}
      {(isDetailModalOpen || isCreateModalOpen) && (
        <div
          className="w-full h-full inset-0 fixed bg-black bg-opacity-70 z-[70]"
          onClick={() => {
            console.log(search, type);
            setIsCreateModalOpen(false);
            setIsDetailModalOpen(false);
            router.push(
              pathname +
                `${type ? `?type=${type}` : search ? `?search=${search}` : ""}`
            );
          }}
        >
          {isDetailModalOpen && (
            <DetailsModal movie={movie} setIsModalOpen={setIsDetailModalOpen} />
          )}
          {isCreateModalOpen && (
            <CreateModal setIsModalOpen={setIsCreateModalOpen} />
          )}
        </div>
      )}
    </ModalContext.Provider>
  );
};
