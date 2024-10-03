"use client";

interface MovieCardProps {
  imageUrl: string;
  movieTitle: string;
}

export default function MovieCard({ imageUrl, movieTitle }: MovieCardProps) {
  return (
    <div
      className="flex flex-col justify-end align-middle bg-cover !w-full !h-28 border-r-5"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <h1>{movieTitle}</h1>
    </div>
  );
}
