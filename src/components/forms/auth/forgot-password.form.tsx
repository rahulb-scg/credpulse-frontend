import { AutoFormSubmit } from "@/components/autoForm/auto-form";
import AutoFormLabel from "@/components/autoForm/common/auto-form-label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/core/use-toast";
import useCustomMutation from "@/hooks/core/useCustomMutation.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthFooter from "./auth-footer";
import AuthHeader from "./auth-header";
const formSchema = z.object({
  email: z.string().email(),
});
const ForgotPasswordForm = () => {
  const router = useRouter();
  const { onSubmit, error, isPending } = useCustomMutation({
    endPoint: "forgot-password",
    schema: formSchema,
    onSuccess: (data: any) => {
      toast({
        title: "Send token",
        description: "Successfully send token",
      });
      router.push(`/forgot-password?email=${data?.email}`);
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const errorMessage = (error as any)?.response?.data?.message;

  return (
    <>
      <AuthHeader
        title="Forgot Password"
        description="Please first  send  otp for verify email"
      />
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(async (values) => {
            onSubmit({
              email: values.email,
            });
          })}
          className="grid gap-8 px-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <AutoFormLabel isRequired label="Email" />
                <FormControl>
                  <Input
                    {...field}
                    className="auth-input"
                    value={field?.value}
                    placeholder="example@gmail.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errorMessage && (
            <div className="text-sm text-destructive ">{errorMessage}</div>
          )}
          <AutoFormSubmit isLoading={isPending}>Submit</AutoFormSubmit>
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

export default ForgotPasswordForm;
