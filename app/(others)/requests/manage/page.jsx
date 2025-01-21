import ListingList from "@/modules/home/components/ListingsList";

export default async function MyRequests() {
  return (
    <main className="wrapper mb-12 mt-6 space-y-4">
      <h1>Manage Requests</h1>
      <ListingList type="manage requests" />
    </main>
  );
}
