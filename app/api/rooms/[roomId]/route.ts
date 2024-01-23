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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { roomId: string } }
) {
  const roomIdInt = parseInt(params.roomId);

  // Check if the room exists before attempting to delete
  const existingRoom = await query({
    query: "SELECT * FROM rooms WHERE id = ?",
    values: [roomIdInt],
  });

  // Check if existingRoom is an array and has length
  if (Array.isArray(existingRoom) && existingRoom.length === 0) {
    return NextResponse.json("Room not found");
  }

  // If the room exists, proceed with the deletion
  await query({
    query: "DELETE FROM rooms WHERE id = ?",
    values: [roomIdInt],
  });

  return NextResponse.json({ message: "Room deleted successfully" });
}
