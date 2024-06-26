"use client";
import AuthFooter from "@/components/forms/auth/auth-footer";
import AuthHeader from "@/components/forms/auth/auth-header";
import OauthSignIn from "@/components/forms/auth/oauthSignin";
import UserAuthForm from "@/components/forms/auth/user-auth.form";
import useCustomSignIn from "@/hooks/useCustomSignIn";

export default function LoginPage() {
  const { setLoading, loading, callbackUrl } = useCustomSignIn();
  return (
    <>
      <AuthHeader
        title="Welcome to Login"
        description="Please login by email and password"
      />
      <UserAuthForm {...{ setLoading, loading, callbackUrl }} />
      <AuthFooter
        link="/register"
        linkLabel="Register Here"
        description="Don't have account?"
      />
      <OauthSignIn {...{ loading, setLoading, callbackUrl }} />
    </>
  );
}
