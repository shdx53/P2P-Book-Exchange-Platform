import { connection } from "@/lib/db";
import { pinata } from "@/lib/pinata";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.formData();
    const title = data.get("title");
    const author = data.get("author");
    const genre = data.get("genre");
    const image = data.get("image");
    const description = data.get("description");

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
    const { IpfsHash } = await pinata.upload.file(image);

    // Connect to the database
    const pool = await connection();
    const conn = await pool.getConnection();

    // Query to insert the new listing data
    const query = `
      INSERT INTO listings (title, author, genre, description, image_cid)
      VALUES (?, ?, ?, ?, ?)
    `;
    await conn.query(query, [title, author, genre, description, IpfsHash]);

    conn.release();

    // // Return success response with inserted data
    // return NextResponse.json(
    //   { message: "Listing added successfully" },
    //   { status: 201 },
    // );
    return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 },
      );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
