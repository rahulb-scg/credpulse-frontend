"use client";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function Provider({
  session,
  children,
}: {
  session: SessionProviderProps["session"];
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
