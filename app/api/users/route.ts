import { NextRequest, NextResponse } from "next/server";
import { query } from "@/app/database/db";

export async function GET(req: NextRequest) {
  const users = await query({
    query: "SELECT * FROM users",
    values: [],
  });
  return NextResponse.json(users);
}
