"use client";
import AuthFooter from "@/components/forms/auth/auth-footer";
import AuthHeader from "@/components/forms/auth/auth-header";
import OauthSignIn from "@/components/forms/auth/oauthSignin";
import SignUpAuthForm from "@/components/forms/auth/signup-auth.form";
import useCustomSignIn from "@/hooks/useCustomSignIn";
import React from "react";

const RegisterPage = () => {
  const { setLoading, loading, callbackUrl } = useCustomSignIn();
  return (
    <>
      <AuthHeader
        title="Create a New account"
        description="Please register your new account"
      />
      <SignUpAuthForm {...{ setLoading, loading, callbackUrl }} />
      <AuthFooter
        link="/login"
        linkLabel="Login Here"
        description="If you have already account?"
      />
      <OauthSignIn {...{ loading, setLoading, callbackUrl }} />
    </>
  );
};

export default RegisterPage;
