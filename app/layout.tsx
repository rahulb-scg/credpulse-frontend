import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/components/layout/providers/provider";
import { getServerSession } from "next-auth";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import { siteConfig } from "@/config/site.config";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
        <NextTopLoader color={"blue"} />
        <Provider {...{ session }}>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
