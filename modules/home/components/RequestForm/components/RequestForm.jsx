"use client";

import Error from "@/components/Error";
import SubmitButton from "@/components/Form/SubmitButton";
import { Form } from "@/components/ui/form";
import { useFormState } from "@/hooks/useFormState";
import { useForm } from "react-hook-form";
import { request } from "../actions/request";

export default function RequestForm({ listingId }) {
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

  async function onSubmit() {
    setIsPending(true);
    const error = await request(listingId);
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
        <SubmitButton
          className="w-full"
          isPending={isPending}
          text="Request to exchange"
        />
      </form>
    </Form>
  );
}
