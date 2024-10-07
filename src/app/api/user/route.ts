import userService from "@/app/services/userService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    if (req.nextUrl.searchParams.get("id")) {
      const user = await userService.getUserById(
        parseInt(req.nextUrl.searchParams.get("id") as string)
      );
      return NextResponse.json(user, { status: 200 });
    }
    const users = await userService.getUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error while getting users: " + err.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await userService.createUser(await req.json());
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error while creating user: " + err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await userService.updateUser(
      parseInt(req.nextUrl.searchParams.get("id") as string),
      await req.json()
    );
    return NextResponse.json({ message: "User updated successfully" });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error while updating user: " + err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await userService.deleteUser(
      parseInt(req.nextUrl.searchParams.get("id") as string)
    );
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error while deleting user: " + err.message },
      { status: 500 }
    );
  }
}
