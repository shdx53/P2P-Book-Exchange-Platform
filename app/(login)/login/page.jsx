"use client";

import Error from "@/components/Error";
import FormInput from "@/components/Form/FormInput";
import SubmitButton from "@/components/Form/SubmitButton";
import { Form } from "@/components/ui/form";
import { useFormState } from "@/hooks/useFormState";
import { login } from "@/modules/login/actions/login";
import { LoginSchema } from "@/modules/login/schema/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Login() {
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
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  // Form submit
  async function onSubmit(data) {
    setIsPending(true);
    const error = await login(data);
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
        className="absolute left-1/2 top-1/2 w-96 -translate-x-1/2 -translate-y-1/2 space-y-8 rounded-lg border-2 border-border p-6"
      >
        <div className="space-y-6">
          <div className="space-y-1 text-center">
            <h1 className="font-bold">Log in</h1>
            <h2 className="text-sm text-muted-foreground">
              Please enter your details
            </h2>
          </div>

          {isError && <Error messaage={errorMessage} />}

          <div className="space-y-4">
            <FormInput
              form={form}
              name="username"
              label="Username"
              placeholder="Enter your username"
            />
            <FormInput
              form={form}
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <SubmitButton className="w-full" isPending={isPending} text="Submit" />
      </form>
    </Form>
  );
}
