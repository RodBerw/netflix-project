"use client";

import Search from "../../public/icons/search.svg";
import Notification from "../../public/icons/notification.svg";
import Profile from "../../public/icons/profile.svg";
import Select from "./Select";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searching, setSearching] = useState(false);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const [scrollY, setScrollY] = useState(0);

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
    <header
      className={`fixed top-0 z-[60] p-4 lg:pl-10 lg:pr-10 w-full flex justify-between items-center transition-colors duration-300 ${
        scrollY === 0
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
            className={`${pathname == "/latest" ? "font-bold" : "font-normal"}`}
          >
            <a href="/latest">New & Popular</a>
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
            />
          </div>
        )}
        <Notification className="text-white w-6 h-6" />
        <Profile className="text-white w-6 h-6" />
      </div>
    </header>
  );
}
