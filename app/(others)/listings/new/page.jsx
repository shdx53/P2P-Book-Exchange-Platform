"use client";

import Error from "@/components/Error";
import FileInput from "@/components/Form/FileInput";
import FormInput from "@/components/Form/FormInput";
import SubmitButton from "@/components/Form/SubmitButton";
import TextareaInput from "@/components/Form/TextareaInput";
import { Form } from "@/components/ui/form";
import { useFormState } from "@/hooks/useFormState";
import { createListing } from "@/modules/new-listing/actions/createListing";
import { inputs } from "@/modules/new-listing/lib/constants/inputs";
import { NewListingSchema } from "@/modules/new-listing/schema/NewListingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function NewListing() {
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
  const form = useForm({
    resolver: zodResolver(NewListingSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      description: "",
    },
    mode: "onChange",
  });

  // Form submit
  async function onSubmit(data) {
    setIsPending(true);
    const error = await createListing(data);
    setIsPending(false);

    if (error) {
      setIsError(true);
      setErrorMessage(error.error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="wrapper space-y-9"
      >
        <div className="mt-6 space-y-4">
          <h1>Create Listing</h1>

          {isError && <Error messaage={errorMessage} />}

          <div className="grid grid-cols-2 gap-6 text-sm">
            {inputs.map(
              ({ name, label, placeholder, type = "text", accept }) => (
                <FormInput
                  key={name}
                  className="col-span-1"
                  form={form}
                  name={name}
                  label={label}
                  type={type}
                  placeholder={placeholder}
                  accept={accept}
                />
              ),
            )}

            <FileInput
              form={form}
              name="image"
              formItemClass="col-span-1"
              label="Image"
              accept="image/png, image/jpeg"
            />

            <TextareaInput
              form={form}
              name="description"
              formItemClassName="col-span-2"
              label="Description"
              placeholder="Enter a description"
            />
          </div>
        </div>

        <SubmitButton isPending={isPending} text="Submit" />
      </form>
    </Form>
  );
}
