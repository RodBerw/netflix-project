"use client";

import Section from "@/components/Section";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import Banner from "@/components/Banner";

export default function Home() {
  const router = useRouter();

  return (
    <div className="font-[family-name:var(--font-geist-sans)] text-primary overflow-hidden">
      <main className="bg-background h-auto flex flex-col items-center">
        <Banner movies={[]} />
        <div className="flex flex-col gap-20 w-full font-bold">
          <Section
            sectionName="Trending Now"
            moviesProps={[]}
            useMoviesProps={false}
          />
          <Section
            sectionName="Recently Added"
            moviesProps={[]}
            useMoviesProps={false}
          />
          <Section
            sectionName="Chosen for you"
            moviesProps={[]}
            useMoviesProps={false}
          />
          <Section sectionName="More" moviesProps={[]} useMoviesProps={false} />
        </div>
        <Button
          type="button"
          className="w-[25%] bg-secondary text-primary font-bold mt-12 mb-12"
          variant="flat"
          radius="sm"
          color="default"
          onClick={() => {
            router.push(`/?add=${true}`);
          }}
        >
          Add Movie
        </Button>
      </main>
    </div>
  );
}
