import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  // Allow register and login without token
  if (
    (req.nextUrl.toString().includes("/api/user") && req.method === "POST") ||
    req.nextUrl.toString().includes("/api/login")
  ) {
    return NextResponse.next();
  }

  // Check if access token is provided
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ message: "Missing token" }, { status: 401 });
  }

  // Check if JWT_ACCESS_SECRET is defined
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "Missing JWT_ACCESS_SECRET" },
      { status: 500 }
    );
  }

  // Verify access token
  try {
    const { payload } = (await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    )) as { payload: any };
    (req as any).user = payload;
    const resp = NextResponse.next();
    resp.headers.set("user", JSON.stringify(payload));
    return resp;
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/:path*",
};
