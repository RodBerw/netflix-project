"use client";

import Section from "@/components/Section";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import Banner from "@/components/Banner";

export default function Home() {
  const router = useRouter();

  return (
    <div className="font-[family-name:var(--font-geist-sans)] text-primary overflow-hidden">
      <main className="bg-background h-auto">
        <Banner movies={[]} title="" />
        <div className="flex flex-col gap-20 w-full font-bold">
          <Section sectionName="All" moviesProps={[]} useMoviesProps={false} />
          <Section sectionName="All" moviesProps={[]} useMoviesProps={false} />
          <Section sectionName="All" moviesProps={[]} useMoviesProps={false} />
        </div>
        <Button
          type="button"
          className="w-full bg-secondary text-primary font-bold"
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
