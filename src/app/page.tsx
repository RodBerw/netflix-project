import Section from "@/components/Section";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] text-primary">
      <main className="bg-background h-auto">
        <div className="flex flex-col m-12 font-bold">
          <Section sectionName="All" />
        </div>
      </main>
    </div>
  );
}
