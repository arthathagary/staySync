import { NextRequest, NextResponse } from "next/server";
import { query } from "@/app/database/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userIdInt = parseInt(params.userId);
  console.log(params.userId);
  const user = await query({
    query: "SELECT * FROM users WHERE id = ?",
    values: [userIdInt],
  });
  return NextResponse.json(user);
}
