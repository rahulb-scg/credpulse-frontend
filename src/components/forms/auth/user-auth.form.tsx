"use client";
import { SignInProps } from "@/types/auth.type";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "../../autoForm/auto-form";
import { Checkbox } from "../../ui/checkbox";
import { Icons } from "../../ui/icons";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),
});

type UserFormValue = z.infer<typeof formSchema>;
const UserAuthForm = ({ loading, callbackUrl, setLoading }: SignInProps) => {
  const router = useRouter();

  const [error, setError] = useState<string>();

  const onSubmit = async (data: UserFormValue) => {
    setLoading("credential");

    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: callbackUrl,
      redirect: false,
    });
    setLoading(null);
    if (response?.error === "UserNotConfirmedException")
      return router.push(`/verify-token?email=${data?.email}`);

    if (!response?.error) return router.push(callbackUrl);
    setError(response?.error);
  };
  return (
    <AutoForm
      fieldConfig={{
        email: {
          inputProps: {
            prefix: (
              <Icons.mail className="auth-input-icon h-4 w-4 " />
            ) as any,
            className:
              "border-gray-500 focus:border-0 bg-gray-800 focus:bg-gray-800 active:bg-gray-800 fill rounded",
          },
        },
        password: {
          inputProps: {
            type: "password",
            prefix: (
              <Icons.keyLock className="auth-input-icon h-4 w-4 " />
            ) as any,
            className:
              "border-gray-500 focus:border-0 bg-gray-800 focus:bg-gray-800 active:bg-gray-800 fill",
          },
        },
      }}
      formSchema={formSchema}
      onSubmit={onSubmit}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember_me" />
          <label
            htmlFor="remember_me"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
        <Link
          className="text-sm font-medium leading-none text-blue-500 hover:underline"
          href="/forgot-password"
        >
          Forgot Password
        </Link>
      </div>
      {error && (
        <div className="break-all text-sm text-destructive">{error}</div>
      )}
      <AutoFormSubmit
        disabled={!!loading}
        className="w-full"
        isLoading={loading === "credential"}
      >
        Login
      </AutoFormSubmit>
    </AutoForm>
  );
};

export default UserAuthForm;
