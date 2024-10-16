import { NextRequest, NextResponse } from "next/server";
import listService from "@/app/services/listService";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("id");
  if (userId) {
    const list = await listService.getListFromUserId(parseInt(userId));
    return NextResponse.json(list, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "Error while getting movies, any userId found..." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { userId, movieId } = await req.json();
  if (!userId || !movieId) {
    return NextResponse.json(
      { message: "userId and movieId are required" },
      { status: 400 }
    );
  }

  try {
    await listService.addMovieToList(userId, movieId);
    return NextResponse.json(
      { message: "Movie added to list successfully" },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error while adding movie to list: " + err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { userId, movieId } = await req.json();
  if (!userId || !movieId) {
    return NextResponse.json(
      { message: "userId and movieId are required" },
      { status: 400 }
    );
  }

  try {
    await listService.removeMovieFromList(userId, movieId);
    return NextResponse.json(
      { message: "Movie removed from list successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error while removing movie from list: " + err.message },
      { status: 500 }
    );
  }
}
