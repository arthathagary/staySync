import { NextRequest, NextResponse } from "next/server";
import { query } from "@/app/database/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { roomId: string } }
) {
  const roomIdInt = parseInt(params.roomId);
  console.log(params.roomId);
  const rooms = await query({
    query: "SELECT * FROM rooms WHERE id = ?",
    values: [roomIdInt],
  });
  return NextResponse.json(rooms);
}
