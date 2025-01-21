import { connection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract the user ID of the listing's owner from the query parameters
    const listingUserId = searchParams.get("listingUserId");

    // Extract user ID from the query parameters
    const userId = searchParams.get("userId");

    if (!listingUserId && !userId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const pool = await connection();
    const conn = await pool.getConnection();

    let data;

    if (listingUserId) {
      // Query the database to get the exchange requests for the user's listings
      const [exchangeRequests] = await conn.query(
        `
          SELECT l.listing_id AS listingId, l.title, l.author, l.image_url AS imageURL, u.username, u.email, r.request_id AS requestId, r.created_at AS createdAt
          FROM listings AS l 
          JOIN requests AS r ON l.listing_id = r.listing_id
          JOIN users AS u ON r.user_id = u.user_id
          WHERE r.status = "pending" AND l.user_id = ?
        `,
        [listingUserId],
      );
      data = exchangeRequests;
    } else {
      const [userRequests] = await conn.query(
        `
          SELECT l.title, l.author, l.image_url AS imageURL, r.status
          FROM requests r 
          JOIN listings l ON l.listing_id = r.listing_id
          WHERE r.user_id = ?
        `,
        [userId],
      );
      data = userRequests;
    }

    conn.release();

    // Check if requests are found
    if (data.length === 0) {
      return NextResponse.json(
        { message: "No requests found" },
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
    const { listingId, userId } = await request.json();

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
      `
        SELECT listing_id 
        FROM listings 
        WHERE listing_id = ? AND user_id = ?
      `,
      [listingId, userId],
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
      `
        SELECT listing_id 
        FROM requests 
        WHERE listing_id = ? AND user_id = ?
      `,
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

    // Query the database to get the user ID of the listing's owner
    let [listingUserId] = await conn.query(
      `
        SELECT u.user_id 
        FROM users AS u 
        JOIN listings AS l 
        ON u.user_id = l.user_id AND l.listing_id = ?
      `,
      [listingId],
    );
    listingUserId = listingUserId[0].user_id;

    // Query to insert the new request
    const query = `
      INSERT INTO requests (listing_id, listing_user_id, user_id)
      VALUES (?, ?, ?)
    `;
    await conn.query(query, [listingId, listingUserId, userId]);

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

export async function PUT(request) {
  try {
    const { requestId, listingId } = await request.json();

    // Validate the required fields
    if (!requestId || !listingId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const pool = await connection();
    const conn = await pool.getConnection();

    const [result] = await conn.query(
      `
      UPDATE requests
      SET status = "accepted"
      WHERE request_id = ?
      `,
      [requestId],
    );

    // Update the rest of the requests to "rejected" for the same listing
    const [rejectedResult] = await conn.query(
      `
        UPDATE requests
        SET status = "rejected"
        WHERE listing_id = ? AND request_id != ?
      `,
      [listingId, requestId],
    );

    conn.release();

    return NextResponse.json(
      { message: "Request updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
