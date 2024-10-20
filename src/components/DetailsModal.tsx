"use client";

import { useEffect, useState } from "react";
import PlaceholderImage from "../../public/icons/PlaceholderImage.svg";
import eventEmitter from "@/utils/eventEmitter";
import { movieDTO } from "@/app/dtos/movieDTO";

export default function DetailsModal({
  setIsModalOpen,
  movie,
}: {
  setIsModalOpen: (value: boolean) => void;
  movie: movieDTO;
}) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div
        className="bg-background w-[850px] flex flex-col rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex flex-col w-full h-[400px] bg-cover bg-center rounded-t-md"
          style={{ backgroundImage: `url(${movie.imageUrl})` }}
        >
          <div></div>
        </div>
        <div className="flex flex-col w-full gap-4 p-12">
          <p className="text-gray-400 inline-block">
            {new Date(movie.releaseDate).getFullYear()} 1 Season
          </p>
          <div className="text-gray-400 w-[35px] bg-gray-800 border-1 border-gray-400 p-1 rounded-md">
            12+
          </div>
        </div>
      </div>
    </div>
  );
}
