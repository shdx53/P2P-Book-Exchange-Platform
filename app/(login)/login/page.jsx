"use client";

import TextInput from "@/components/Form/TextInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { login } from "@/modules/login/actions/login";
import { LoginSchema } from "@/modules/login/schema/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CircleX } from "lucide-react";
import { useFormState } from "@/hooks/useFormState";
import { Ellipsis } from "lucide-react";

export default function Login() {
  // Form state
  const { isPending, setIsPending, isError, setIsError } = useFormState();

  // Form config
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data) {
    setIsPending(true);
    const { error } = await login(data);
    setIsPending(false);
    setIsError(error);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="absolute left-1/2 top-1/2 w-96 -translate-x-1/2 -translate-y-1/2 space-y-8 rounded-lg border-2 border-muted p-6"
      >
        <div className="space-y-6">
          <div className="space-y-1 text-center">
            <h1 className="font-bold">Log in</h1>
            <h2 className="text-sm text-muted-foreground">
              Please enter your details
            </h2>
          </div>

          {isError && (
            <div className="flex items-center gap-2 rounded-md bg-red-100 p-3 text-red-500">
              <CircleX />
              <p className="text-sm">{isError}</p>
            </div>
          )}

          <div className="space-y-4">
            <TextInput
              form={form}
              name="username"
              label="Username"
              placeholder="Enter your username"
            />
            <TextInput
              form={form}
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Ellipsis /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
