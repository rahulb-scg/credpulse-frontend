"use client";
import { AutoFormSubmit } from "@/components/autoForm/auto-form";
import AutoFormLabel from "@/components/autoForm/common/auto-form-label";
import AuthFooter from "@/components/forms/auth/auth-footer";
import AuthHeader from "@/components/forms/auth/auth-header";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/hooks/core/use-toast";
import useCustomMutation from "@/hooks/core/useCustomMutation.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  code: z.string().min(6).max(6),
});
type FormValuesType = z.infer<typeof formSchema>;
const VerifyToken = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const {
    onSubmit: onSendToken,
    error,
    isPending,
  } = useCustomMutation({
    endPoint: "verify-token",
    schema: formSchema,
    onSuccess: () => {
      toast({
        title: "Email Verified",
        description: "Email has been verified successfully",
      });
      router.push("/login");
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const errorMessage = (error as any)?.response?.data?.message;
  return (
    <>
      <AuthHeader
        title="Confirm User"
        description="Please Confirm User by enter token."
      />
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(async (values) => {
            onSendToken({
              email: email,
              code: values.code,
            });
          })}
          className="grid gap-8 px-4"
        >
          <div className="text-center text-sm">{email}</div>

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <AutoFormLabel label="Verification Code" isRequired />
                <FormControl>
                  <InputOTP
                    onChange={(e) => {
                      field?.onChange(e);
                    }}
                    value={field?.value ?? ""}
                    maxLength={6}
                    disabled={!email}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot className="auth-input" index={0} />
                      <InputOTPSlot className="auth-input" index={1} />
                      <InputOTPSlot className="auth-input" index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot className="auth-input" index={3} />
                      <InputOTPSlot className="auth-input" index={4} />
                      <InputOTPSlot className="auth-input" index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errorMessage && (
            <div className="text-sm text-destructive ">{errorMessage}</div>
          )}
          <AutoFormSubmit disabled={!email} isLoading={isPending}>
            Submit
          </AutoFormSubmit>
        </form>
      </Form>
      <AuthFooter
        link="/login"
        linkLabel="Login"
        description="Do you want to login new user?"
        disabledSeparator
      />
    </>
  );
};

export default VerifyToken;
