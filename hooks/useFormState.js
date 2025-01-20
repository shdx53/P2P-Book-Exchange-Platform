import { useState } from "react";

export const useFormState = () => {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  return { isPending, setIsPending, isError, setIsError };
};
