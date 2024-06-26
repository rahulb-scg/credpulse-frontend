"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import Spinner from "@/components/Spinner";

export default function Logout() {
  // SignOut (next-auth) when redirected to /logout
  // manually navigating to /logout does not signout user from cognito
  // /logout is called from cognito logout endpoint
  useEffect(() => {
    signOut({ callbackUrl: "/" });
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-row items-center justify-center space-x-4">
      <h2 className="text-lg font-bold">Logging Out</h2>
      <Spinner />
    </div>
  );
}
