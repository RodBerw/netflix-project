"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Select() {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();

  return (
    <div
      className="p-2"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Dropdown isOpen={isHover} className="bg-black rounded-none">
        <DropdownTrigger>
          <Button className="text-white" variant="light">
            Menu
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="light" className="bg-black">
          <DropdownItem
            variant="light"
            className="!bg-black !text-gray-400 hover:!text-white"
            key="new"
            onClick={() => router.push("/")}
          >
            Home
          </DropdownItem>
          <DropdownItem
            variant="light"
            className="!bg-black !text-gray-400 hover:!text-white"
            key="edit"
            onClick={() => router.push("/browse/?type=series")}
          >
            TV Shows
          </DropdownItem>
          <DropdownItem
            variant="light"
            className="!bg-black !text-gray-400 hover:!text-white"
            key="edit"
            onClick={() => router.push("/browse/?type=movie")}
          >
            Movies
          </DropdownItem>
          <DropdownItem
            variant="light"
            className="!bg-black !text-gray-400 hover:!text-white"
            key="edit"
            onClick={() => router.push("/")}
          >
            New & Popular
          </DropdownItem>
          <DropdownItem
            variant="light"
            className="!bg-black !text-gray-400 hover:!text-white"
            key="edit"
            onClick={() => router.push("/browse/?search=my-list")}
          >
            My List
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
