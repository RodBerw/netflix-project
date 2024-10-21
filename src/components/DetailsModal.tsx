"use client";

import { useEffect, useState } from "react";
import PlaceholderImage from "../../public/icons/PlaceholderImage.svg";
import eventEmitter from "@/utils/eventEmitter";
import { movieDTO } from "@/app/dtos/movieDTO";

interface Episode {
  id: number;
  title: string;
  description: string;
  length: number;
}

export default function DetailsModal({
  setIsModalOpen,
  movie,
}: {
  setIsModalOpen: (value: boolean) => void;
  movie: movieDTO;
}) {
  const [selectedEp, setSelectedEp] = useState(1);
  const [episodes, setEpisodes] = useState<Episode[]>([
    {
      id: 1,
      title: "Episode 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum euismod ipsum, semper maximus ante imperdiet quis. Fusce a ligula.",
      length: 24,
    },
    {
      id: 2,
      title: "Episode 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum euismod ipsum, semper maximus ante imperdiet quis. Fusce a ligula.",
      length: 24,
    },
    {
      id: 3,
      title: "Episode 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum euismod ipsum, semper maximus ante imperdiet quis. Fusce a ligula.",
      length: 24,
    },
    {
      id: 4,
      title: "Episode 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum euismod ipsum, semper maximus ante imperdiet quis. Fusce a ligula.",
      length: 24,
    },
    {
      id: 5,
      title: "Episode 5",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum euismod ipsum, semper maximus ante imperdiet quis. Fusce a ligula.",
      length: 24,
    },
    {
      id: 6,
      title: "Episode 6",
      description:
        "DLorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum euismod ipsum, semper maximus ante imperdiet quis. Fusce a ligula.",
      length: 24,
    },
  ]);

  return (
    <div className="w-full h-full flex flex-col items-center overflow-auto">
      <div
        className="bg-background w-[850px] mt-8 flex flex-col rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex flex-col w-full h-[400px] bg-cover bg-center rounded-t-md"
          style={{ backgroundImage: `url(${movie.imageUrl})` }}
        >
          <div></div>
        </div>
        <div className="flex flex-col w-full p-12">
          <p className="text-gray-400 inline-block">
            {new Date(movie.releaseDate).getFullYear()} 10 episodes
          </p>
          <div className="text-gray-400 w-[35px] bg-gray-800 border-1 border-gray-400 p-1 rounded-md">
            12+
          </div>
          <p className="mt-6">{movie.description}</p>
          <h1 className="font-bold text-xl mt-8 mb-4">Episodes</h1>
          <div className="flex flex-col">
            {episodes.map((episode, key) => {
              return (
                <div
                  key={key}
                  className="h-[150px] w-full p-4 border-b-1 flex border-gray-600 rounded-md"
                  style={{
                    background: `${
                      episode.id == selectedEp ? "#333" : "#33333300"
                    }`,
                  }}
                >
                  <div className="w-[7%] flex flex-shrink-0 flex-grow-0 justify-center items-center text-2xl text-[#d2d2d2]">
                    {key + 1}
                  </div>
                  <div className="w-[18%] flex flex-shrink-0 flex-grow-0 justify-center items-center">
                    <img
                      className="w-full h-[73px] rounded-md object-cover"
                      src={movie.imageUrl}
                    />
                  </div>
                  <div className="w-[70%] min-h-full flex justify-center flex-col flex-shrink-0 flex-grow-0">
                    <p className="font-bold text-base pt-4 pr-4 pl-4 pb-2">
                      {episode.title}
                    </p>
                    <p className="h-full pl-4 pr-4 pb-4 text-[#d2d2d2] text-sm leading-5">
                      {episode.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
