import { connection } from "@/lib/db";
import { pinata } from "@/lib/pinata";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const pool = await connection();
    const conn = await pool.getConnection();

    const [data] = await conn.query(
      "SELECT listing_id as listingId, title, author, genre, description, image_url AS imageURL, listed_by AS listedBy, created_at AS createdAt FROM listings",
    );

    conn.release();

    // Check if listings exists
    if (data.length === 0) {
      return NextResponse.json(
        { message: "No listings found" },
        { status: 404 },
      );
    }

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
    const listedBy = data.get("username");

    // Validate the required fields
    if (!title || !author || !genre || !image || !description) {
      return NextResponse.json(
        {
          message:
            "Missing required fields",
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
      INSERT INTO listings (title, author, genre, description, image_url, listed_by)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await conn.query(query, [title, author, genre, description, url, listedBy]);

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
