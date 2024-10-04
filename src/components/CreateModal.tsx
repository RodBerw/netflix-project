"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import CustomInput from "@/components/CustomInput";

export default function CreateModal() {
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
  const [imgUrl, setImgUrl] = useState("");

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
      <div className="bg-black bg-opacity-70 w-1/2 p-12 rounded-sm !flex !flex-col">
        <img src={`url(${imgUrl})`} alt="Img" className="rounded-md" />
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="grid grid-cols-2 gap-4">
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
              onChange={(e) => setImgUrl(e.target.value)}
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
              Add Movie
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
