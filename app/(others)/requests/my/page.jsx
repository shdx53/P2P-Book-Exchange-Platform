import ListingList from "@/modules/home/components/ListingsList";

export default function MyRequests() {
  return (
    <main className="wrapper mt-6 space-y-4">
      <h1>My Requests</h1>
      <ListingList type="my requests" />
    </main>
  );
}
