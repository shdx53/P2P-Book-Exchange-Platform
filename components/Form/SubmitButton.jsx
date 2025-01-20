import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";

export default function SubmitButton({ className, isPending, text }) {
  return (
    <Button
      type="submit"
      className={`${className} bg-blue-700 hover:bg-blue-600`}
      disabled={isPending}
    >
      {isPending ? <Ellipsis /> : text}
    </Button>
  );
}
