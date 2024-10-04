"use client";

import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import CustomInput from "@/components/CustomInput";

export default function Create() {
  const [movie, setMovie] = useState({
    userId: 0,
    title: "",
    description: "",
    director: "",
    genre: "",
    releaseDate: "",
    imageUrl: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setMovie({
      ...movie,
      title: e.target.title.value,
      description: e.target.description.value,
      director: e.target.director.value,
      genre: e.target.genre.value,
      releaseDate: e.target.releaseDate.value,
      imageUrl: e.target.imageUrl.value,
    });

    if (
      movie.title === "" ||
      movie.description === "" ||
      movie.director === "" ||
      movie.genre === "" ||
      movie.releaseDate === "" ||
      movie.imageUrl === ""
    ) {
      setSubmitted(true);
      return;
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="bg-black bg-opacity-70 flex flex-col gap-4 p-12 rounded-sm">
        <form onSubmit={(e) => handleSubmit(e)}>
          <CustomInput
            type="text"
            name="title"
            label="Title"
            isInvalid={submitted && movie.title === ""}
            errorMessage="Title is required"
          />
          <CustomInput
            type="text"
            name="description"
            label="Description"
            isInvalid={submitted && movie.description === ""}
            errorMessage="Description is required"
          />
          <CustomInput
            type="text"
            name="director"
            label="Director"
            isInvalid={submitted && movie.director === ""}
            errorMessage="Director is required"
          />
          <CustomInput
            type="text"
            name="genre"
            label="Genre"
            isInvalid={submitted && movie.genre === ""}
            errorMessage="Genre is required"
          />
          <CustomInput
            type="date"
            name="releaseDate"
            label="Release Date"
            isInvalid={submitted && movie.releaseDate === ""}
            errorMessage="Release Date is required"
          />
          <CustomInput
            type="text"
            name="imageUrl"
            label="Image URL"
            isInvalid={submitted && movie.imageUrl === ""}
            errorMessage="Image URL is required"
          />
          <Button
            type="submit"
            className="w-full bg-secondary text-primary font-bold"
            variant="flat"
            radius="sm"
            color="default"
          >
            Create Movie
          </Button>
        </form>
      </div>
    </div>
  );
}
