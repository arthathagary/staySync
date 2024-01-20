import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { query } from "@/app/database/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password, userRole } = body;

  // Set image to null if it's undefined
  const image = body.image || null;

  const createdAt = new Date().getTime();
  const updatedAt = new Date().getTime();

  console.log(body);

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await query({
    query: `
      INSERT INTO users (email, name, hashedPassword, userRole, image, createdAt, updatedAt)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `,
    values: [
      email,
      name,
      hashedPassword,
      userRole,
      image,
      createdAt,
      updatedAt,
    ],
  });

  return NextResponse.json(user);
}
