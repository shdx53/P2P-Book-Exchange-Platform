import { connection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Extract formUsername from the query parameters
    const { searchParams } = new URL(request.url);
    const formUsername = searchParams.get("username");

    if (!formUsername) {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 },
      );
    }

    const pool = await connection();
    const conn = await pool.getConnection();

    // Query the database to get the user by username
    const [data] = await conn.query(
      "SELECT user_id, password FROM users WHERE username = ?",
      [formUsername],
    );

    conn.release();

    // Check if user exists
    if (data.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(data[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
