import { BookCopy } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <BookCopy />
      <span className="font-bold">BookSwap</span>
    </div>
  );
}
