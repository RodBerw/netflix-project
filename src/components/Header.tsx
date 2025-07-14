"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Notification from "../../public/icons/Notification.svg";
import Profile from "../../public/icons/Profile.svg";
import Search from "../../public/icons/Search.svg";
import Select from "./Select";
import { Button } from "@nextui-org/button";

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searching, setSearching] = useState(false);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mouseHoverNotification, setMouseHoverNotification] = useState(false);
  const [mouseHoverUser, setMouseHoverUser] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    searchBarRef.current?.focus();
  }, [searching]);

  if (pathname == "/login" || pathname == "/register") return null;
  return (
    <div
      className="fixed top-0 flex flex-col z-[60] w-full"
      onMouseLeave={() => setMouseHoverUser(false)}
    >
      <header
        className={`p-4 lg:pl-10 lg:pr-10 w-full flex justify-between items-center transition-colors duration-300 ${
          scrollY === 0 && pathname == "/"
            ? "bg-transparent"
            : // : "bg-gradient-to-b from-black to-background"
              "bg-background"
        }`}
      >
        <div className="min-w-40 flex w-2/3 items-center space-x-4">
          <img
            src="/images/netflix-logo.png"
            alt="Logo"
            className="w-1/2 min-w-16 max-w-32 h-10 object-cover"
          />
          <div className="md:hidden flex">
            <Select />
          </div>
          <ul className="hidden md:flex text-[1vw] space-x-4 text-white">
            <li className={`${pathname == "/" ? "font-bold" : "font-normal"}`}>
              <a href="/">Home</a>
            </li>
            <li
              className={`${
                pathname == "/browse" && searchParams.get("type") == "series"
                  ? "font-bold"
                  : "font-normal"
              }`}
            >
              <a href="/browse/?type=series">TV Shows</a>
            </li>
            <li
              className={`${
                pathname == "/browse" && searchParams.get("type") == "movie"
                  ? "font-bold"
                  : "font-normal"
              }`}
            >
              <a href="/browse/?type=movie">Movies</a>
            </li>
            <li
              className={`${
                pathname == "/latest" ? "font-bold" : "font-normal"
              }`}
            >
              <a href="/">New & Popular</a>
            </li>
            <li
              className={`${
                pathname == "/browse" && searchParams.get("search") == "my-list"
                  ? "font-bold"
                  : "font-normal"
              }`}
            >
              <a href="/browse/?search=my-list">My List</a>
            </li>
          </ul>
        </div>
        <div className="min-w-24 items-center flex justify-end w-1/3 space-x-4">
          {!searching ? (
            <Search
              className="text-white hover:cursor-pointer w-6 h-6"
              onClick={() => setSearching(true)}
            />
          ) : (
            <div className=" flex bg-black bg-opacity-70 border-1 border-white p-1 rounded-none">
              <Search className="text-white w-6 h-6" />
              <input
                type="text"
                className="bg-transparent w-0 ml-2 focus:w-48 transition-size duration-300 text-white rounded-none !border-none focus:border-none outline-none"
                placeholder="Titles, people and genres"
                onBlur={() => setSearching(false)}
                ref={searchBarRef}
                onChange={(e) => {
                  if (e.target.value === "") {
                    router.push(`/`);
                  } else {
                    router.push(`/browse/?search=${e.target.value}`);
                  }
                }}
              />
            </div>
          )}
          <Notification
            className="text-white w-6 h-6 hover:cursor-pointer relative"
            onMouseEnter={() => setMouseHoverNotification(true)}
            onMouseLeave={() => setMouseHoverNotification(false)}
          />
          {mouseHoverNotification && (
            <div className="absolute w-72 text-center mt-2 top-12 right-20 bg-background bg-opacity-70 p-12 rounded-none border-t-1 border-white">
              <p className="text-gray-400">No recent notifications</p>
            </div>
          )}
          <Profile
            className="text-white w-6 h-6"
            onMouseEnter={() => setMouseHoverUser(true)}
          />
          {mouseHoverUser && (
            <div
              className="absolute flex flex-col items-center w-50 text-center mt-2 top-12 right-11 bg-background bg-opacity-70 p-6 gap-4 rounded-sm border-1 border-gray-800"
              onMouseLeave={() => setMouseHoverUser(false)}
            >
              <h1>User</h1>
              <Button
                type="button"
                className="w-[50%] bg-secondary text-primary font-bold"
                variant="flat"
                radius="sm"
                color="default"
                onClick={() => {
                  router.push(`/?add=${true}`);
                }}
              >
                Add Movie
              </Button>
              <Button
                type="button"
                className="w-[50%] bg-secondary text-primary font-bold"
                variant="flat"
                radius="sm"
                color="default"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userId");
                  router.push(`/login`);
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </header>
      {pathname != "/" ? (
        <h1
          className={`w-full p-4 !pl-[4%] text-2xl font-bold transition-colors duration-300 ${
            scrollY === 0 ? "bg-transparent" : "bg-background"
          }`}
        >
          {(() => {
            if (pathname === "/browse") {
              if (searchParams.get("type") === "series") return "TV Shows";
              if (searchParams.get("type") === "movie") return "Movies";
              if (searchParams.get("search") === "my-list") return "My List";
            }
          })()}
        </h1>
      ) : null}
    </div>
  );
}
