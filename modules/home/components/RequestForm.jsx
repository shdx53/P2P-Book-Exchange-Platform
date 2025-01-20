"use client";

import SubmitButton from "@/components/Form/SubmitButton";
import { Form } from "@/components/ui/form";
import { useFormState } from "@/hooks/useFormState";
import { useForm } from "react-hook-form";

export default function RequestForm() {
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
    // const error = await createListing(data);
    setIsPending(false);

    // if (error) {
    //   setIsError(true);
    //   setErrorMessage(error.error);
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SubmitButton className="w-full" isPending={isPending} text="Request to exchange" />
      </form>
    </Form>
  );
}
