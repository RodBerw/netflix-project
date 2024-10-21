"use client";

import CreateModal from "@/components/CreateModal";
import DetailsModal from "@/components/DetailsModal";
import Header from "@/components/Header";
import Section from "@/components/Section";
import eventEmitter from "@/utils/eventEmitter";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { movieDTO } from "./dtos/movieDTO";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/utils/configAxios";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState("");
  const [movieId, setMovieId] = useState(0);
  const [movie, setMovie] = useState<movieDTO>({
    //userId: parseInt(localStorage.getItem("userId") as string),
    userId: 0,
    title: "",
    description: "",
    director: "",
    genre: "",
    releaseDate: new Date(),
    imageUrl: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  function setNewModal(modal: string, movie: movieDTO) {
    setMovie(movie);
    setModal(modal);
    setIsModalOpen(true);
  }

  useEffect(() => {
    movie.userId = parseInt(localStorage.getItem("userId") as string);
  }, []);

  useEffect(() => {
    const movieId = parseInt(searchParams.get("id") as string);

    if (isNaN(movieId)) return;

    setMovieId(movieId);

    try {
      api.get(`/api/movie/?id=${movieId}`).then((res) => {
        setNewModal("details", res.data);
      });
    } catch (err) {
      console.error(err);
    }
  }, [searchParams.get("id")]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <div className="font-[family-name:var(--font-geist-sans)] text-primary overflow-x-hidden">
      <Header />
      <main className="bg-background h-auto">
        <div className="flex flex-col gap-20 w-full font-bold">
          <Section sectionName="All" />
          <Section sectionName="All" />
          <Section sectionName="All" />
        </div>
        <Button
          type="button"
          className="w-full bg-secondary text-primary font-bold"
          variant="flat"
          radius="sm"
          color="default"
          onClick={() => {
            setModal("create");
            setIsModalOpen(true);
          }}
        >
          Add Movie
        </Button>
      </main>
      {isModalOpen && (
        <div
          className="w-full h-full inset-0 fixed bg-black bg-opacity-70 z-50"
          onClick={() => {
            setIsModalOpen(false), router.push("/");
          }}
        >
          {modal === "create" ? (
            <CreateModal setIsModalOpen={setIsModalOpen} />
          ) : (
            <DetailsModal setIsModalOpen={setIsModalOpen} movie={movie} />
          )}
        </div>
      )}
    </div>
  );
}
