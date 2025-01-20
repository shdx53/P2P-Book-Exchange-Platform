"use server";

import Listing from "./Listing";

export default async function ListingList() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/listings`);
  const listings = await data.json();


  if (!Array.isArray(listings)) {
    return (
      <div className="p-6 text-center text-sm">
        <p>
          {listings.message === "Internal server error"
            ? "Oops! Something went wrong"
            : listings.message}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      {listings.map((listing, index) => (
        <Listing key={index} listing={listing} />
      ))}
    </div>
  );
}
