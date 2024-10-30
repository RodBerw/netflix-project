"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import CustomInput from "@/components/CustomInput";
import { Textarea } from "@nextui-org/input";
import api from "@/utils/configAxios";
import { useRouter } from "next/navigation";
import PlaceholderImage from "../../public/icons/PlaceholderImage.svg";
import { RadioGroup, Radio } from "@nextui-org/radio";

export default function CreateModal({
  setIsModalOpen,
}: {
  setIsModalOpen: (value: boolean) => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  const [movie, setMovie] = useState({
    userId: parseInt(localStorage.getItem("userId") as string),
    title: "",
    description: "",
    director: "",
    genre: "",
    releaseDate: "",
    imageUrl: "",
    type: "movie",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (
      movie.title === "" ||
      movie.description === "" ||
      movie.director === "" ||
      movie.genre === "" ||
      movie.releaseDate === "" ||
      movie.imageUrl === "" ||
      movie.type === ""
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
          {movie.imageUrl === "" ? (
            <PlaceholderImage className="w-32 h-32" />
          ) : (
            <img
              src={movie.imageUrl}
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
                onChange={(e) =>
                  setMovie((prev) => ({ ...prev, title: e.target.value }))
                }
                isInvalid={submitted && movie.title === ""}
                errorMessage="Title is required"
                className="col-start-1 col-end-2 row-start-1 row-end-2"
              />
              <CustomInput
                type="date"
                name="releaseDate"
                label="Release Date"
                onChange={(e) =>
                  setMovie((prev) => ({ ...prev, releaseDate: e.target.value }))
                }
                isInvalid={submitted && movie.releaseDate === ""}
                errorMessage="Release Date is required"
                className="col-start-2 col-end-3 row-start-1 row-end-2"
              />
              <CustomInput
                type="text"
                name="imageUrl"
                label="Image URL"
                onChange={(e) =>
                  setMovie((prev) => ({ ...prev, imageUrl: e.target.value }))
                }
                isInvalid={submitted && movie.imageUrl === ""}
                errorMessage="Image URL is required"
                className="col-start-1 col-end-3 row-start-2 row-end-3"
              />
              <Textarea
                type="text"
                name="description"
                label="Description"
                onChange={(e) =>
                  setMovie((prev) => ({ ...prev, description: e.target.value }))
                }
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
                onChange={(e) =>
                  setMovie((prev) => ({ ...prev, director: e.target.value }))
                }
                isInvalid={submitted && movie.director === ""}
                errorMessage="Director Date is required"
                className="col-start-1 col-end-2 row-start-5 row-end-6"
              />
              <CustomInput
                type="text"
                name="genre"
                label="Genre"
                onChange={(e) =>
                  setMovie((prev) => ({ ...prev, genre: e.target.value }))
                }
                isInvalid={submitted && movie.genre === ""}
                errorMessage="Genre is required"
                className="col-start-2 col-end-3 row-start-5 row-end-6"
              />
            </div>
            <RadioGroup
              label="Type: "
              orientation="horizontal"
              onChange={(e) =>
                setMovie((prev) => ({ ...prev, type: e.target.value }))
              }
              defaultValue="movie"
              className="!text-white"
            >
              <Radio classNames={{ label: "!text-white" }} value="movie">
                Movie
              </Radio>
              <Radio classNames={{ label: "!text-white" }} value="series">
                Series
              </Radio>
            </RadioGroup>
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
