import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/db";
import Admin from "@/backend/models/Admin";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Auto-seed admin user if not exists
    const adminExists = await Admin.findOne({ username: "admin" });
    if (!adminExists) {
      await Admin.create({
        username: "admin",
        password: "admin", // Store "admin" as requested
      });
      console.log("Default admin user seeded.");
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    // Query database for admin user
    const dbAdmin = await Admin.findOne({ username });

    if (!dbAdmin || dbAdmin.password !== password) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // Update last login timestamp
    dbAdmin.lastLoginAt = new Date();
    await dbAdmin.save();

    // Create a response and set the cookie
    const response = NextResponse.json({ success: true, message: "Logged in successfully" });
    
    // Set cookie: admin_session=true, HTTPOnly, Secure, SameSite, maxAge 1 day
    response.cookies.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
