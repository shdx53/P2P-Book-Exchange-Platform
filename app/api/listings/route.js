import { connection } from "@/lib/db";
import { pinata } from "@/lib/pinata";
import { getSession } from "@/modules/login/actions/getSession";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    const pool = await connection();
    const conn = await pool.getConnection();

    // Query the database to get all listings
    const [data] = await conn.query(
      "SELECT listing_id, title, author, genre, description, image_url AS imageURL, listed_by AS listedBy, created_at AS createdAt FROM listings",
    );

    conn.release();

    // Check if listings exists
    if (data.length === 0) {
      return NextResponse.json(
        { message: "No listings found" },
        { status: 404 },
      );
    }

    // Return the data if found
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

    if (!title || !author || !genre || !image || !description) {
      return NextResponse.json(
        {
          message:
            "All fields (title, author, genre, image, description) are required",
        },
        { status: 400 },
      );
    }

    // Upload image to Pinata
    const uploadData = await pinata.upload.file(image);
    const url = await pinata.gateways.convert(uploadData.IpfsHash);

    // Connect to the database
    const pool = await connection();
    const conn = await pool.getConnection();

    // Query to insert the new listing data
    const query = `
      INSERT INTO listings (title, author, genre, description, image_url, listed_by)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await conn.query(query, [title, author, genre, description, url, listedBy]);

    conn.release();

    // Return success response with inserted data
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
