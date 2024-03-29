import { NextRequest, NextResponse } from "next/server";
import { query } from "@/app/database/db";
import getRooms from "@/app/actions/getRoomsById";
import axios from "axios";

//this is for getting all bookings history details
export async function GET(req: NextRequest) {
  const bookingsHistory = await query({
    query: "SELECT * FROM allbookings",
    values: [],
  });
  return NextResponse.json(bookingsHistory);
}
