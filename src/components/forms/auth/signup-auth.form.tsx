"use client";
import { SignInProps } from "@/types/auth.type";
import { SignUpFormSchema } from "@/types/user.type";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "../../autoForm/auto-form";
import { Icons } from "../../ui/icons";

type UserFormValue = z.infer<typeof SignUpFormSchema>;
const SignUpAuthForm = ({ loading, callbackUrl, setLoading }: SignInProps) => {
  const router = useRouter();

  const [error, setError] = useState<string>();

  const onSubmit = async (data: UserFormValue) => {
    setLoading("credential");

    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      name: data?.name,
      is_register: true,
      callbackUrl: callbackUrl,
      redirect: false,
    });
    setLoading(null);

    if (!response?.error)
      return router.push(`/verify-token?email=${data?.email}`);
    if (response?.error === "UserNotConfirmedException")
      return router.push(`/verify-token?email=${data?.email}`);
    setError(response?.error);
  };
  return (
    <AutoForm
      fieldConfig={{
        name: {
          inputProps: {
            className:
              "border-gray-500 focus:border-0 bg-gray-800 focus:bg-gray-800 active:bg-gray-800 fill rounded",
            prefix: (
              <Icons.circleUser className="auth-input-icon h-4 w-4 " />
            ) as any,
          },
        },
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
      formSchema={SignUpFormSchema}
      onSubmit={onSubmit}
    >
      {error && (
        <div className="break-all text-sm text-destructive">{error}</div>
      )}
      <AutoFormSubmit
        disabled={!!loading}
        className="w-full"
        isLoading={loading === "credential"}
      >
        Create New Account
      </AutoFormSubmit>
    </AutoForm>
  );
};

export default SignUpAuthForm;
