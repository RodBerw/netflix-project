"use client";

import { listDTO } from "@/app/dtos/listDTO";
import { movieDTO } from "@/app/dtos/movieDTO";
import { userDTO } from "@/app/dtos/userDTO";
import api from "@/utils/configAxios";
import eventEmitter from "@/utils/eventEmitter";
import { waitForSeconds } from "@/utils/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    }
  }, []);

  return (
    <div
      className={`absolute transform transition-all duration-300 ease-in-out object-cover overflow-hidden rounded-md  ${
        isHovered
          ? "scale-150 z-40 h-72"
          : "scale-100 z-10 h-32 hover:cursor-pointer"
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
        <img src={imageUrl} alt="Movie Image" className=" w-full" />
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
              const list = (await api.get(
                `/list/?userId=${userId}`
              )) as listDTO;

              await api.post("/list", {
                userId: userId,
                moviesId: [...list.moviesId, movie.id],
              });
            }}
            className="w-[12%]"
            src="/icons/Add.svg"
          />
          <img
            onClick={() => {
              router.push(`/?id=${movie.id}`);
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
