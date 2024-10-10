"use client";

import CreateModal from "@/components/CreateModal";
import Header from "@/components/Header";
import Section from "@/components/Section";
import { Button } from "@nextui-org/button";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="font-[family-name:var(--font-geist-sans)] text-primary">
      <Header />
      <main className="bg-background h-auto">
        <div className="flex flex-col gap-20 w-full font-bold ">
          <Section sectionName="All" />
          <Section sectionName="All" />
          <Section sectionName="All" />
        </div>
        <Button
          type="button"
          className="w-full bg-secondary text-primary font-bold"
          variant="flat"
          radius="sm"
          color="default"
          onClick={() => setIsModalOpen(true)}
        >
          Add Movie
        </Button>
      </main>
      {isModalOpen && (
        <div
          className="w-full h-full inset-0 fixed bg-black bg-opacity-70"
          onClick={() => setIsModalOpen(false)}
        >
          <CreateModal setIsModalOpen={setIsModalOpen} />
        </div>
      )}
    </div>
  );
}
