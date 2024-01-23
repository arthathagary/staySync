import { NextRequest, NextResponse } from "next/server";
import { query } from "@/app/database/db";

export async function GET(req: NextRequest) {
  try {
    const rooms = await query({
      query: "SELECT * FROM rooms",
      values: [],
    });
    return NextResponse.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json("Internal Server Error");
  }
}

export async function POST(req: NextRequest) {
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
      // createdAt,
    } = await req.json();
    let filename = "";
    if (imageSrc) {
      const filePath = imageSrc.target.value;
      const pathSegments = filePath.split("\\");
      filename = pathSegments[pathSegments.length - 1];
    }
    // Perform the necessary operations with the data (e.g., insert into the database)
    await query({
      query:
        "INSERT INTO rooms (title, description,imageSrc,category,roomCount,bathroomCount,guestCount,price,locationValue) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)",
      values: [
        title,
        description,
        filename,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        price,
        location.value,
        // userId,
      ],
    });

    // Send a response
    return NextResponse.json({
      success: true,
      message: "Room added successfully",
    });
  } catch (error) {
    console.error("Error adding room:", error);
    return NextResponse.json("Internal Server Error");
  }
}
