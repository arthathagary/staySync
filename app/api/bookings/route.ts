import { NextRequest, NextResponse } from "next/server";
import { query } from "@/app/database/db";

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
    const formattedStaryDate = startDateObject
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const formattedEndDate = endDateObject
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const result = await query({
      query: `
      INSERT INTO bookings (userId, roomId, startDate, endDate, totalPrice, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      values: [
        1,
        roomId,
        formattedStaryDate,
        formattedEndDate,
        totalPrice,
        createdAt,
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
