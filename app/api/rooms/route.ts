import { NextRequest, NextResponse } from "next/server";
import { query } from "@/app/database/db";

export async function GET(req: NextRequest) {
  const rooms = await query({
    query: "SELECT * FROM rooms",
    values: [],
  });
  return NextResponse.json(rooms);
}
