import movieService from "@/app/services/movieService";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    if (req.nextUrl.searchParams.get("id")) {
      const movie = await movieService.getMovieById(
        parseInt(req.nextUrl.searchParams.get("id") as string)
      );
      return NextResponse.json(movie, { status: 200 });
    } else if (req.nextUrl.searchParams.get("userId")) {
      const movies = await movieService.getMoviesByUserId(
        parseInt(req.nextUrl.searchParams.get("userId") as string)
      );
      return NextResponse.json(movies, { status: 200 });
    }
    const movies = await movieService.getMovies();
    return NextResponse.json(movies, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error while getting movies: " + err.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await movieService.createMovie(await req.json());
    return NextResponse.json(
      { message: "Movie created successfully" },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error while creating movie: " + err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = JSON.parse(req.headers.get("user") as string);
    const movieToUpdateId = req.nextUrl.searchParams.get("id");

    if (
      !user ||
      (movieToUpdateId &&
        user.id !==
          (await movieService.getMovieById(parseInt(movieToUpdateId)))?.userId)
    ) {
      return NextResponse.json(
        { message: "You are not authorized to update this movie" },
        { status: 401 }
      );
    }

    await movieService.updateMovie(
      parseInt(req.nextUrl.searchParams.get("id") as string),
      await req.json()
    );
    return NextResponse.json({ message: "Movie updated successfully" });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error while updating movie: " + err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = JSON.parse(req.headers.get("user") as string);
    const movieToDeleteId = req.nextUrl.searchParams.get("id");

    if (
      !user ||
      (movieToDeleteId &&
        user.id !==
          (await movieService.getMovieById(parseInt(movieToDeleteId)))?.userId)
    ) {
      return NextResponse.json(
        { message: "You are not authorized to delete this movie" },
        { status: 401 }
      );
    }

    await movieService.deleteMovie(
      parseInt(req.nextUrl.searchParams.get("id") as string)
    );
    return NextResponse.json({ message: "Movie deleted successfully" });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error while deleting movie: " + err.message },
      { status: 500 }
    );
  }
}
