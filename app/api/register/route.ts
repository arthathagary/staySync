import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { query } from "@/app/database/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password, userType } = body;

  // Set image to null if it's undefined
  const image = body.image || null;

  console.log(body);

  const existingUser = await query({
    query: `
      SELECT * FROM Users
      WHERE email = ?
    `,
    values: [email],
  });

  const isEmailRegistered =
    Array.isArray(existingUser) && existingUser.length > 0;

  if (isEmailRegistered) {
    // Email is already registered, show toast or handle accordingly
    return NextResponse.json(
      { error: "Email is already registered" },
      { status: 400 } // Bad Request status
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await query({
      query: `
        INSERT INTO Users (email, name, hashedPassword, userRole, image)
        VALUES (?, ?, ?, ?, ?)
      `,
      values: [email, name, hashedPassword, userType, image],
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error inserting user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
