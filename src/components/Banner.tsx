import { movieDTO } from "@/app/dtos/movieDTO";
import api from "@/utils/configAxios";
import { Button } from "@nextui-org/button";
import { useContext, useEffect, useState } from "react";
import SimplePlay from "../../public/icons/SimplePlay.svg";
import Info from "../../public/icons/Info.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ModalContext } from "./ModalContext";

interface Props {
  movies: movieDTO[];
}

export default function Banner({ movies }: Props) {
  const [bannerMovie, setBannerMovie] = useState<movieDTO>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const modalContext = useContext(ModalContext);

  useEffect(() => {
    if (movies.length > 0) {
      setBannerMovie(movies[movies.length - 1]);
      return;
    }

    try {
      api.get("/api/movie").then((response) => {
        const data = response.data as movieDTO[];
        setBannerMovie(data[data.length - 1] as movieDTO);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="w-full h-[42vw] min-h-60 relative">
      <div
        className="w-full h-[50vw] relative bg-center bg-cover"
        style={{
          backgroundImage: `url(${bannerMovie?.imageUrl})`,
        }}
      >
        <div
          className="w-full h-[2vw] absolute bottom-0"
          style={{
            background: "linear-gradient(0deg, var(--background), transparent)",
          }}
        ></div>
      </div>
      <div className="absolute w-[50%] h-full flex items-end left-[4%] bottom-[.5vw]">
        <div className="flex flex-col gap-1 text-6xl font-bold">
          <h1 className="w-full text-[clamp(24px,4vw,64px)]">
            {bannerMovie?.title}
          </h1>
          <p className="mb-6 w-[75%] line-clamp-3 font-normal text-[clamp(12px,1.2vw,48px)]">
            {bannerMovie?.description}
          </p>
          <div className="flex gap-2 mb-[6vw]">
            <Button
              className="pl-[1.75vw] pr-[2.5vw] pb-[.5vw] pt-[.5vw] h-auto bg-white rounded-md font-semibold text-base"
              startContent={<SimplePlay width="30px" height="30px" />}
            >
              Watch
            </Button>
            <Button
              onClick={() => {
                modalContext.setSearch(searchParams.get("search") ?? "");
                modalContext.setType(searchParams.get("type") ?? "");
                window.history.replaceState(
                  null,
                  "",
                  //   `${pathname}/?id=${bannerMovie?.id}${
                  //     searchParams.get("type")
                  //       ? `&type=${searchParams.get("type")}`
                  //       : ""
                  //   }${
                  //     searchParams.get("search")
                  //       ? `&search=${searchParams.get("search")}`
                  //       : ""
                  //   }`
                  `${`?id=${bannerMovie?.id}`}`
                );
              }}
              className="pl-[1vw] pr-[2vw] pb-[.5vw] pt-[.5vw] h-auto bg-gray-500 rounded-md !bg-opacity-40 border-none font-semibold text-base text-white"
              startContent={<Info width="30px" height="30px" />}
            >
              More Infromations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
