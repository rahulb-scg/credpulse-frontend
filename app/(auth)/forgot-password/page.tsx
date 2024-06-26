"use client";
import ConfirmForgotPasswordForm from "@/components/forms/auth/confirm-forgot-password.form";
import ForgotPasswordForm from "@/components/forms/auth/forgot-password.form";
import { useSearchParams } from "next/navigation";

const ForgotPassword = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  if (email) return <ConfirmForgotPasswordForm email={email} />;
  return <ForgotPasswordForm />;
};

export default ForgotPassword;
