import { BookCopy } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-2 text-sm">
        <BookCopy />
        <span className="font-bold">BookSwap</span>
      </div>
    </Link>
  );
}
