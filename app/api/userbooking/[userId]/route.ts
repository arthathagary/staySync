import { NextRequest, NextResponse } from "next/server";
import { query } from "@/app/database/db";

// This is for getting all bookings details via id
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userIdInt = parseInt(params.userId);
  console.log(params.userId);
  const bookings = await query({
    query: "SELECT * FROM bookings WHERE userId = ?",
    values: [userIdInt],
  });
  return NextResponse.json(bookings);
}

// This is for deleting userbookings details
export async function DELETE(
  req: NextRequest,
  { params }: { params: { bookingId: string } }
) {
  const bookingIdIdInt = parseInt(params.bookingId);

  // Check if the room exists before attempting to delete
  const existingRoom = await query({
    query: "SELECT * FROM bookings WHERE id = ?",
    values: [bookingIdIdInt],
  });

  // Check if existingRoom is an array and has length
  if (Array.isArray(existingRoom) && existingRoom.length === 0) {
    return NextResponse.json("Room not found");
  }

  // If the room exists, proceed with the deletion
  await query({
    query: "DELETE FROM bookings WHERE id = ?",
    values: [bookingIdIdInt],
  });

  return NextResponse.json({ message: "Booking deleted successfully" });
}
