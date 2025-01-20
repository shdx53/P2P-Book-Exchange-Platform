import { CircleX } from "lucide-react";

export default function Error({ messaage }) {
  return (
    <div className="flex items-center gap-2 rounded-md bg-red-100 p-3 text-red-500">
      <CircleX />
      <p className="text-sm">{messaage}</p>
    </div>
  );
}
