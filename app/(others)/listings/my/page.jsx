import ListingList from "@/modules/home/components/ListingsList";

export default async function MyListings() {
  return (
    <main className="wrapper mb-12 mt-6 space-y-4">
      <h1>My Listings</h1>
      <ListingList type="my listings" />
    </main>
  );
}
