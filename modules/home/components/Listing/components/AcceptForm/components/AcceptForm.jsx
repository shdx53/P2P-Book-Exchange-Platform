"use client";

import Error from "@/components/Error";
import { Form } from "@/components/ui/form";
import { useFormState } from "@/hooks/useFormState";
import { useForm } from "react-hook-form";
import { updateStatus } from "../actions/updateStatus";

export default function AcceptForm({ requestId, listingId }) {
  // Form state
  const {
    isPending,
    setIsPending,
    isError,
    setIsError,
    errorMessage,
    setErrorMessage,
  } = useFormState();

  // Form config
  const form = useForm({});

  // Form submit
  async function onSubmit() {
    setIsPending(true);
    const error = await updateStatus(requestId, listingId);
    setIsPending(false);

    if (error) {
      setIsError(true);
      setErrorMessage(error.error);
    } else {
      window.location.reload();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {isError && <Error messaage={errorMessage} />}
        <div
          className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md bg-blue-700 text-white"
          onClick={onSubmit}
        >
          Accept
        </div>
      </form>
    </Form>
  );
}
