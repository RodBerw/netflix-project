"use client";

import { waitForSeconds } from "@/utils/utils";
import React, { useState } from "react";

interface MovieCardProps {
  imageUrl: string;
  movieTitle: string;
  setShowArrows: React.Dispatch<React.SetStateAction<boolean>>;
  xOffset: number;
  setFocusedIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}

export default function MovieCard({
  imageUrl,
  movieTitle,
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
          ? "scale-150 z-40 h-60"
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
        className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 text-white p-4 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="text-xl font-bold mb-2">{movieTitle}</h2>
        <p className="text-sm mb-2">asdasd</p>
        <p className="text-xs mb-1">Genre: asd</p>
        <p className="text-xs">Release Date: asdasd</p>
      </div>
    </div>
  );
}
