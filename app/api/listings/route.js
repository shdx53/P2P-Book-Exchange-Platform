import { connection } from "@/lib/db";
import { pinata } from "@/lib/pinata";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pool = await connection();
    const conn = await pool.getConnection();

    const [data] = await conn.query(
      "SELECT listing_id as listingId, title, author, genre, description, image_url AS imageURL, user_id AS userId, created_at AS createdAt FROM listings",
    );

    // Check if listings exists
    if (data.length === 0) {
      return NextResponse.json(
        { message: "No listings found" },
        { status: 404 },
      );
    }

    const userId = data[0].userId;

    // Query the database to get the username of the listing's owner
    const [user] = await conn.query(
      "SELECT username FROM users WHERE user_id = ?",
      [userId],
    );
    const username = user[0].username;

    // Add the username to the listing data
    data[0] = { ...data[0], username };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const title = data.get("title");
    const author = data.get("author");
    const genre = data.get("genre");
    const image = data.get("image");
    const description = data.get("description");
    const userId = data.get("userId");

    // Validate the required fields
    if (!title || !author || !genre || !image || !description) {
      return NextResponse.json(
        {
          message: "Missing required fields",
        },
        { status: 400 },
      );
    }

    // Upload image to Pinata
    const uploadData = await pinata.upload.file(image);
    const url = await pinata.gateways.convert(uploadData.IpfsHash);

    const pool = await connection();
    const conn = await pool.getConnection();

    const query = `
      INSERT INTO listings (title, author, genre, description, image_url, user_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await conn.query(query, [title, author, genre, description, url, userId]);

    conn.release();

    return NextResponse.json(
      { message: "Listing added successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
