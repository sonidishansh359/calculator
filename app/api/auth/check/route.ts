import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("admin_session");

  if (session && session.value === "true") {
    return NextResponse.json({ loggedIn: true });
  }

  return NextResponse.json({ loggedIn: false });
}
