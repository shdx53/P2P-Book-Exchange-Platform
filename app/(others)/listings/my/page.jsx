import ListingList from "@/modules/home/components/ListingsList";

export default function MyListings() {
  return (
    <main className="wrapper mt-6 space-y-4">
      <h1>My Listings</h1>
      <ListingList type="my" />
    </main>
  );
}
