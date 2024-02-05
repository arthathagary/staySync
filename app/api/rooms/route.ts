import { query } from "@/app/database/db";
import { NextRequest, NextResponse } from "next/server";

// This is for getting all rooms details with search values
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    let queries = "SELECT * FROM rooms";
    const location = url.searchParams.get("locationValue");
    const room = url.searchParams.get("roomCount[gte]");
    const guest = url.searchParams.get("guestCount[gte]");
    const bathroom = url.searchParams.get("bathroomCount[gte]");
    const category = url.searchParams.get("category");
    const valuesData = [];
    if (location) {
      queries += " WHERE locationValue = ?";
      valuesData.push(location);
    }

    if (room) {
      queries += location ? " AND" : " WHERE";
      queries += " roomCount >= ?";
      valuesData.push(room);
    }

    if (guest) {
      queries += location || room ? " AND" : " WHERE";
      queries += " guestCount >= ?";
      valuesData.push(guest);
    }

    if (bathroom) {
      queries += location || room || guest ? " AND" : " WHERE";
      queries += " bathroomCount >= ?";
      valuesData.push(bathroom);
    }
    if (category) {
      queries += location || room || guest || bathroom ? " AND" : " WHERE";
      queries += " category = ?";
      valuesData.push(category);
    }

    const rooms = await query({
      query: queries,
      values: valuesData,
    });
    console.log(rooms);
    const resultArray = Array.isArray(rooms) ? rooms : [rooms];
    return NextResponse.json(resultArray);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json("Internal Server Error");
  }
}

// This is for adding rooms details
export async function POST(req: NextRequest) {
  try {
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
      userId,
      // createdAt,
    } = await req.json();
    console.log("req", imageSrc);

    let filename = "";
    // if (imageSrc) {
    //   const filePath = imageSrc.target.value;
    //   const pathSegments = filePath.split("\\");
    //   filename = pathSegments[pathSegments.length - 1];
    // }
    // Perform the necessary operations with the data (e.g., insert into the database)

    await query({
      query:
        "INSERT INTO rooms (title, description,imageSrc,category,roomCount,bathroomCount,guestCount,price,locationValue,fullBoardPrice,halfBoardPrice,userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)",
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
        fullBoard,
        halfBoard,
        userId,
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
