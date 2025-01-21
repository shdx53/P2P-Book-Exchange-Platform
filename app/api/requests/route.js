import { connection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { listingId, userId, username } = await request.json();

    // Validate the required fields
    if (!listingId || !userId) {
      return NextResponse.json(
        {
          message: "Missing required fields",
        },
        { status: 400 },
      );
    }

    const pool = await connection();
    const conn = await pool.getConnection();

    // Query the database to check if the user is trying to request their own listing
    const [listing] = await conn.query(
      "SELECT listing_id FROM listings WHERE listing_id = ? AND listed_by = ?",
      [listingId, username],
    );

    if (listing.length > 0) {
      return NextResponse.json(
        {
          message: "You cannot request to exchange your own listing",
        },
        { status: 400 },
      );
    }

    // Query the database to check if a request already exists for the given listing and user
    const [existingRequest] = await conn.query(
      "SELECT listing_id FROM requests WHERE listing_id = ? AND user_id = ?",
      [listingId, userId],
    );

    if (existingRequest.length > 0) {
      return NextResponse.json(
        {
          message: "A request to exchange this listing already exists",
        },
        { status: 400 },
      );
    }

    // Query to insert the new request
    const query = `
      INSERT INTO requests (listing_id, user_id)
      VALUES (?, ?)
    `;
    await conn.query(query, [listingId, userId]);

    conn.release();

    return NextResponse.json(
      { message: "Request added successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
