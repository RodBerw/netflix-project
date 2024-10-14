"use client";

import { movieDTO } from "@/app/dtos/movieDTO";
import { waitForSeconds } from "@/utils/utils";
import React, { useState } from "react";

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
      await waitForSeconds(1, controller).then(() => {
        console.log("Coroutine finished");
        setFocusedIndex(index);
        setShowArrows(false);
        setIsHovered(true);
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div
      className={`relative transform transition-all duration-300 ease-in-out object-cover overflow-hidden rounded-md  ${
        isHovered
          ? "scale-150 z-40 h-72"
          : "scale-100 z-10 h-40 hover:cursor-pointer"
      }`}
      style={{
        pointerEvents: "auto",
        left: `${isHovered ? xOffset : 0}%`,
      }}
      onMouseEnter={() => {
        console.log("Mouse entered movie card");
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
          <img className="w-[12%]" src="/icons/Add.svg" />
          <img className="w-[12%] ml-auto" src="/icons/Expand.png" />
        </div>
        <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
        <p className="text-xs mb-1">Seaon 1</p>
        <p className="text-xs">{movie.genre}</p>
      </div>
    </div>
  );
}
