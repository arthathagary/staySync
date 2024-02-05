import { NextRequest, NextResponse } from "next/server";
import { query } from "@/app/database/db";

// This is for getting specific rooms details with room id
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

// This is for updating specific rooms details with room id
export async function PUT(
  req: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    // Assuming you are expecting some data in the request body
    const {
      category,
      location,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price,
      title,
      description,
      fullBoard,
      halfBoard,
    } = await req.json();

    // Perform the necessary operations with the data (e.g., update the database)
    await query({
      query:
        "UPDATE rooms SET title=?, description=?, imageSrc=?, category=?, roomCount=?, bathroomCount=?, guestCount=?, price=?, locationValue=?, fullBoardPrice=?, halfBoardPrice=? WHERE id=?",
      values: [
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        price,
        location.value,
        fullBoard,
        halfBoard,
        params.roomId,
      ],
    });

    // Send a response
    return NextResponse.json({
      success: true,
      message: "Room updated successfully",
    });
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json("Internal Server Error");
  }
}
