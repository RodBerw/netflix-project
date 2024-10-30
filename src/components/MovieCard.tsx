"use client";

import { listDTO } from "@/app/dtos/listDTO";
import { movieDTO } from "@/app/dtos/movieDTO";
import { userDTO } from "@/app/dtos/userDTO";
import api from "@/utils/configAxios";
import eventEmitter from "@/utils/eventEmitter";
import { waitForSeconds } from "@/utils/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "./ModalContext";

interface MovieCardProps {
  imageUrl: string;
  movie: movieDTO;
  setShowArrows: React.Dispatch<React.SetStateAction<boolean>>;
  xOffset: number;
  setFocusedIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}

export default function MovieCard({
  imageUrl,
  movie,
  setShowArrows,
  xOffset,
  setFocusedIndex,
  index,
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [abortController, setAbortController] = useState(new AbortController());

  const handleMovieHover = async () => {
    const controller = new AbortController();
    setAbortController(controller);

    try {
      await waitForSeconds(0.5, controller).then(() => {
        setFocusedIndex(index);
        setShowArrows(false);
        setIsHovered(true);
      });
    } catch (err: any) {}
  };

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState(0);
  const modalContext = useContext(ModalContext);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    }
  }, []);

  return (
    <div
      className={`transform w-full !object-contain transition-all duration-300 ease-in-out overflow-hidden rounded-md  ${
        isHovered
          ? "scale-150 z-40 h-[42vh]"
          : "scale-100 z-10 h-[18vh] hover:cursor-pointer"
      }`}
      style={{
        pointerEvents: "auto",
        left: `${isHovered ? xOffset : 0}%`,
      }}
      onMouseEnter={() => {
        handleMovieHover();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowArrows(true);
        abortController.abort();
        setFocusedIndex(0);
      }}
    >
      <div className="flex h-full items-center ">
        <img
          src={imageUrl}
          alt="Movie Image"
          className="w-full h-full !object-cover"
        />
      </div>
      <div
        className={`absolute bottom-0 left-0 w-full bg-background text-white p-4 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex justify-start gap-[2%]">
          <img className="w-[12%]" src="/icons/Play.svg" />
          <img
            onClick={async () => {
              let list: listDTO | null = null;
              try {
                const response = await api.get(`/api/list/?userId=${userId}`);
                list = response.data as listDTO;
              } catch (err: any) {
                console.log(err);
              }

              if (!list) {
                await api.post("/api/list", {
                  userId: userId,
                  movieId: movie.id,
                });
              } else {
                await api.put(`/api/list/`, {
                  userId: userId,
                  movieId: movie.id,
                });
              }
            }}
            className="w-[12%] hover:cursor-pointer"
            src="/icons/Add.svg"
          />
          <img
            onClick={() => {
              modalContext.setSearch(searchParams.get("search") ?? "");
              modalContext.setType(searchParams.get("type") ?? "");
              router.push(`${pathname}/?id=${movie.id}`);
            }}
            className="w-[12%] ml-auto hover:brightness-110 cursor-pointer"
            src="/icons/Expand.png"
          />
        </div>
        <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
        <p className="text-xs mb-1">Seaon 1</p>
        <p className="text-xs">{movie.genre}</p>
      </div>
    </div>
  );
}
