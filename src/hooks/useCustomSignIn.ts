"use client";
import { SignInWayTypes } from "@/types/auth.type";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const useCustomSignIn = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<SignInWayTypes>();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard/reports";
  return {
    callbackUrl,
    setLoading,
    loading,
  };
};

export default useCustomSignIn;
