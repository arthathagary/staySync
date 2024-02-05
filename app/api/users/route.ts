import { decodeToken } from "@/app/actions/DecodeToken";
import { query } from "@/app/database/db";
import { NextRequest, NextResponse } from "next/server";

//getting specific userdata with email
export async function GET(req: NextRequest) {
  const tokenWithBearer = req.headers.get("authorization");
  const token = tokenWithBearer?.replace("Bearer ", "");
  console.log(token);

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" });
  }

  // Decode the token
  const decodedToken = decodeToken(token);
  console.log(decodedToken);

  if (!decodedToken) {
    return NextResponse.json({ error: "Invalid token" });
  }

  // Find the user based on the decoded token's user ID
  // const user = findUserById(decodedToken.sub);
  const user = decodedToken.email;
  // const userData = findUserByEmail(decodedToken.email);
  const userData = await query({
    query: "SELECT * FROM users WHERE email = ?",
    values: [user],
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" });
  }

  // Return the user data
  return NextResponse.json(userData);
}
