import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";

export default function SubmitButton({ className, isPending }) {
  return (
    <Button type="submit" className={className} disabled={isPending}>
      {isPending ? <Ellipsis /> : "Submit"}
    </Button>
  );
}
