import NextAuth from "next-auth/next";

import { authOptions } from "@/constants/auth.option";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
