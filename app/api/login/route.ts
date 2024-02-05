import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { query } from "@/app/database/db";
import jwt from "jsonwebtoken";

interface User {
  id: number;
  name: string;
  email: string;
  hashedPassword: string;
}

//this is responsible for validated login credentials
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }
    // Retrieve user from the database based on the provided email
    const result: any = await query({
      query: `
        SELECT * FROM Users
        WHERE email = ?
      `,
      values: [email],
    });
    if (!result || result.length === 0) {
      // User not found
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const user = result[0]; // Assuming you expect one user based on email

    if (!user) {
      // User not found
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword
    );

    if (!isPasswordCorrect) {
      // Incorrect password
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    // Password is correct, return user data (excluding hashedPassword)
    const { hashedPassword, ...userData } = user;
    const token = jwt.sign(
      { userId: user.id, userRole: user.userRole, email },
      "idnwdiwdnwdwidwdnmwkm",
      {
        expiresIn: "24h",
      }
    );

    return NextResponse.json({ userData, token });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
