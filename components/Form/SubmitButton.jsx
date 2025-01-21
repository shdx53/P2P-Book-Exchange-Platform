import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";

export default function SubmitButton({
  className,
  isPending,
  text,
  disabled = false,
}) {
  return (
    <Button
      type="submit"
      className={`${className} bg-blue-700 hover:bg-blue-600`}
      disabled={isPending || disabled}
    >
      {isPending ? <Ellipsis /> : text}
    </Button>
  );
}
