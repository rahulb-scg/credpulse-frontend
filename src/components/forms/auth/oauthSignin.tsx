import { Icons } from "@/components/ui/icons";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/button";
import { SignInProps } from "@/types/auth.type";

const OauthSignIn = ({ loading, callbackUrl, setLoading }: SignInProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        onClick={() => {
          setLoading("company");
          signIn("azure-ad", { callbackUrl }, { prompt: "login" })
            .then((res) => {
              setLoading(null);
            })
            .catch((err) => {
              setLoading(null);
            });
        }}
        variant={"outline"}
        className="w-full border-primary bg-gray-800 text-primary hover:text-primary"
        type="button"
        disabled={!!loading}
      >
        {loading === "company" && <Icons.spinner className="mr-2 h-4 w-4" />}{" "}
        <Icons.dashboard className="mr-2 h-4 w-4 text-primary" />
        Microsoft
      </Button>
      <Button
        onClick={() => {
          setLoading("google");
          signIn("google", { callbackUrl })
            .then((res) => {
              setLoading(null);
            })
            .catch((err) => {
              setLoading(null);
            });
        }}
        variant={"outline"}
        className="w-full border-primary bg-gray-800 text-primary hover:text-primary"
        type="button"
        disabled={!!loading}
      >
        {loading === "google" && <Icons.spinner className="mr-2 h-4 w-4" />}{" "}
        <Icons.google className="mr-2 h-4 w-4 text-primary" />
        Google
      </Button>
    </div>
  );
};

export default OauthSignIn;
