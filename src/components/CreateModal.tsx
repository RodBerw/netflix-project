"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import CustomInput from "@/components/CustomInput";
import { Textarea } from "@nextui-org/input";
import api from "@/utils/configAxios";
import { useRouter } from "next/navigation";
import PlaceholderImage from "../../public/icons/PlaceholderImage.svg";

export default function CreateModal({
  setIsModalOpen,
}: {
  setIsModalOpen: (value: boolean) => void;
}) {
  const router = useRouter();

  const [submitted, setSubmitted] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  let movie = {
    userId: parseInt(localStorage.getItem("userId") as string),
    title: "",
    description: "",
    director: "",
    genre: "",
    releaseDate: "",
    imageUrl: "",
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    movie = {
      userId: parseInt(localStorage.getItem("userId") as string),
      title: e.target.title.value,
      description: e.target.description.value,
      director: e.target.director.value,
      genre: e.target.genre.value,
      releaseDate: e.target.releaseDate.value,
      imageUrl: e.target.imageUrl.value,
    };

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

    api
      .post("/api/movie", movie)
      .then(() => {
        setIsModalOpen(false);
        location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div
        className="bg-black bg-opacity-90 p-12 rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="mb-7 text-4xl font-bold text-center">Add Movie</h1>
        <div className="flex gap-4">
          {imgUrl === "" ? (
            <PlaceholderImage className="w-32 h-32" />
          ) : (
            <img
              src={imgUrl}
              alt="Img"
              className="rounded-md w-32 h-32 object-cover"
            />
          )}
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 grid-rows-5 gap-4">
              <CustomInput
                type="text"
                name="title"
                label="Title"
                isInvalid={submitted && movie.title === ""}
                errorMessage="Title is required"
                className="col-start-1 col-end-2 row-start-1 row-end-2"
              />
              <CustomInput
                type="date"
                name="releaseDate"
                label="Release Date"
                isInvalid={submitted && movie.releaseDate === ""}
                errorMessage="Release Date is required"
                className="col-start-2 col-end-3 row-start-1 row-end-2"
              />
              <CustomInput
                type="text"
                name="imageUrl"
                label="Image URL"
                onChange={(e) => setImgUrl(e.target.value)}
                isInvalid={submitted && movie.imageUrl === ""}
                errorMessage="Image URL is required"
                className="col-start-1 col-end-3 row-start-2 row-end-3"
              />
              <Textarea
                type="text"
                name="description"
                label="Description"
                isInvalid={submitted && movie.description === ""}
                errorMessage="Description is required"
                className="col-start-1 col-end-3 row-start-3 row-end-5"
                classNames={{
                  inputWrapper: [
                    "bg-gray-900",
                    "bg-opacity-30",
                    "overflow-y-auto",
                  ],
                }}
                variant="faded"
                minRows={5}
                maxRows={5}
              />
              <CustomInput
                type="text"
                name="director"
                label="Director"
                isInvalid={submitted && movie.director === ""}
                errorMessage="Director Date is required"
                className="col-start-1 col-end-2 row-start-5 row-end-6"
              />
              <CustomInput
                type="text"
                name="genre"
                label="Genre"
                isInvalid={submitted && movie.genre === ""}
                errorMessage="Genre is required"
                className="col-start-2 col-end-3 row-start-5 row-end-6"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-secondary text-primary font-bold"
              variant="flat"
              radius="sm"
              color="default"
            >
              Add Movie
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
