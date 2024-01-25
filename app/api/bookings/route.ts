import { NextRequest, NextResponse } from "next/server";
import { query } from "@/app/database/db";
import getRooms from "@/app/actions/getRoomsById";
import axios from "axios";

export async function GET(req: NextRequest) {
  const bookings = await query({
    query: "SELECT * FROM bookings",
    values: [],
  });
  return NextResponse.json(bookings);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, roomId, startDate, endDate, totalPrice } = body;

  if (userId && roomId && startDate && endDate && totalPrice) {
    const createdAt = new Date();
    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDate);
    const formattedStaryDate = startDateObject.toISOString().slice(0, 10);

    const formattedEndDate = endDateObject.toISOString().slice(0, 10);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/rooms/${roomId}`
      );
      var img = response.data[0].imageSrc;
    } catch (error) {
      console.log(error);
    }

    const result = await query({
      query: `
      INSERT INTO bookings (userId, roomId, startDate, endDate, totalPrice, createdAt,imageSrc)
      VALUES (?, ?, ?, ?, ?, ?,?)
    `,
      values: [
        userId,
        roomId,
        formattedStaryDate,
        formattedEndDate,
        totalPrice,
        createdAt,
        img,
      ],
    });

    return NextResponse.json(result);
  } else {
    // Handle the case where some values are missing in the request body
    return NextResponse.json({
      error: "Missing required fields in the request body.",
    });
  }
}
