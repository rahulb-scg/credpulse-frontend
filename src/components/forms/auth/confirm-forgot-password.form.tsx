import { AutoFormSubmit } from "@/components/autoForm/auto-form";
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
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "@/hooks/core/use-toast";
import useCustomMutation from "@/hooks/core/useCustomMutation.hook";
import { passwordRegex } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthFooter from "./auth-footer";
import AuthHeader from "./auth-header";
import AutoFormLabel from "@/components/autoForm/common/auto-form-label";
const formSchema = z.object({
  password: z
    .string({
      required_error: "Password is required.",
    })
    .regex(passwordRegex, {
      message: "Your password is not valid",
    }),
  code: z.string().min(6).max(6),
});
const ConfirmForgotPasswordForm = ({ email }: { email: string }) => {
  const router = useRouter();
  const { onSubmit, error, isPending } = useCustomMutation({
    endPoint: "forgot-password/confirm",
    schema: formSchema,
    onSuccess: () => {
      router.push("/login");
      toast({
        title: "Forgot Password",
        description: "Successfully forgot your password",
      });
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const errorMessage = (error as any)?.response?.data?.message;
  return (
    <>
      <AuthHeader
        title="Confirm Forgot Password"
        description="Please enter new password and otp token ."
      />
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(async (values) => {
            onSubmit({
              email: email,
              code: values.code,
              password: values.password,
            });
          })}
          className="grid gap-8 px-4"
        >
          <div className="text-center text-sm">{email}</div>
          <FormField
            control={form?.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <AutoFormLabel isRequired label="Password" />
                <FormControl>
                  <PasswordInput
                    placeholder="***********"
                    className="auth-input"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

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

export default ConfirmForgotPasswordForm;
