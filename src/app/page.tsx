import Header from "@/components/Header";
import Section from "@/components/Section";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] text-primary">
      <Header />
      <main className="bg-background h-auto">
        <div className="flex flex-col w-full font-bold">
          <Section sectionName="All" />
        </div>
      </main>
    </div>
  );
}
