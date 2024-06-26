import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    access_token?: string;
    user_id?: string;
  }
}
