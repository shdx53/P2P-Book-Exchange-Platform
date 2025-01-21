import { getSession } from "@/modules/login/actions/getSession";
import Listing from "./Listing/components/Listing";

export default async function ListingList({ type }) {
  let endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

  if (type === "my listings") {
    // My listings page
    const { userId } = await getSession();
    endpoint += `/listings?userId=${userId}`;
  } else if (type === "manage requests") {
    // My exchange requests page
    const { userId } = await getSession();
    endpoint += `/requests?listingUserId=${userId}`;
  } else if (type === "my requests") {
    // My requests page
    const { userId } = await getSession();
    endpoint += `/requests?userId=${userId}`;
  } else {
    endpoint += "/listings";
  }

  const data = await fetch(endpoint, {
    cache: "no-store",
  });
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
        <Listing key={index} listing={listing} type={type} />
      ))}
    </div>
  );
}
