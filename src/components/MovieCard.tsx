"use client";

interface MovieCardProps {
  movieUrl: string;
  movieTitle: string;
}

export default function MovieCard({ movieUrl, movieTitle }: MovieCardProps) {
  return (
    <div
      className="flex flex-col justify-end align-middle bg-contain"
      style={{ backgroundImage: `url(${movieUrl})`, height: "10vw" }}
    >
      <h1>{movieTitle}</h1>
    </div>
  );
}
