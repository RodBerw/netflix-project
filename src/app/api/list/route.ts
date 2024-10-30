import { NextRequest, NextResponse } from "next/server";
import listService from "@/app/services/listService";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
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
    await listService.createList(userId, movieId);
    return NextResponse.json(
      { message: "List created successfully" },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error while creating list: " + err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { userId, movieId } = await req.json();
  if (!userId || !movieId) {
    return NextResponse.json(
      { message: "userId and movieId are required" },
      { status: 400 }
    );
  }

  try {
    const user = JSON.parse(req.headers.get("user") as string);
    const listToUpdate = await listService.getListFromUserId(user.id);

    if (!user || (listToUpdate && user.id !== listToUpdate.userId)) {
      return NextResponse.json(
        { message: "You are not authorized to delete this list" },
        { status: 401 }
      );
    }

    await listService.updateList(userId, movieId);
    return NextResponse.json(
      { message: "List updated successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error while updating list: " + err.message },
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
    const user = JSON.parse(req.headers.get("user") as string);
    const listToDelete = await listService.getListFromUserId(user.id);

    if (!user || (listToDelete && user.id !== listToDelete.userId)) {
      return NextResponse.json(
        { message: "You are not authorized to delete this list" },
        { status: 401 }
      );
    }

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
