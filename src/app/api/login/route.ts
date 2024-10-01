import authService from "@/app/services/authService";
import userService from "@/app/services/userService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        const {email, password} = await req.json();
    
        if(!email || !password){
            return NextResponse.json({message: "Email and password are required"}, {status: 400});
        }
    
        const user = await userService.getUserByEmail(email);
    
        if(!user || !user.id){
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
    
        const hashedPassword = user.password;
        const approved = await userService.login(password, hashedPassword);
    
        if(!approved){
            return NextResponse.json({message: "Invalid password"}, {status: 401});
        }
    
        if(!process.env.JWT_REFRESH_SECRET){
            return NextResponse.json({message: "JWT_REFRESH_SECRET is not defined"}, {status: 500});
        }
        if(!process.env.JWT_ACCESS_SECRET){
            return NextResponse.json({message: "JWT_ACCESS_SECRET is not defined"}, {status: 500});
        }
    
        const tokens = await authService.generateTokens(user.id, user.email);
    
        NextResponse.next().cookies.set("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
        });
    
        if(process.env.NODE_ENV !== "production"){
            console.error("ATTENTION: Token is not secure in development mode, for production set NODE_ENV to 'production'");
        }
    
        return NextResponse.json({message: "Logged in with accessToken: " + tokens.accessToken}, {status: 200});
    }catch(err: any){
        return NextResponse.json({message: "Error while logging in: " + err.message}, {status: 500});
    }
}

export async function GET(req: NextRequest) {
    try{
        if(!req.cookies.get("refreshToken")){
            return NextResponse.json({message: "No refresh token found"}, {status: 404});
        }
    
        if(!process.env.JWT_REFRESH_SECRET){
            throw new Error("JWT_REFRESH_SECRET is not defined");
        }
        if(!process.env.JWT_ACCESS_SECRET){
            throw new Error("JWT_ACCESS_SECRET is not defined");
        }
    
        const newToken = await authService.refreshAccessToken(req.cookies.get("refreshToken") as unknown as string);
    
        return NextResponse.json({message: "Token refreshed, new token: " + newToken}, {status: 200});
    }catch(err: any){
        return NextResponse.json({message: "Error while refreshing token: " + err.message}, {status: 500});
    }
}