import Credentials from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";
import { createHash, timingSafeEqual } from "crypto";

const SEVEN_DAYS = 7 * 24 * 60 * 60;

function constantTimeCompare(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a, "utf8").digest();
  const hb = createHash("sha256").update(b, "utf8").digest();
  if (ha.length !== hb.length) return false;
  return timingSafeEqual(ha, hb);
}

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const envUser = process.env.LOGIN_USERNAME;
        const envPass = process.env.LOGIN_PASSWORD;
        if (!envUser || !envPass) return null;

        const username = credentials?.username;
        const password = credentials?.password;
        if (typeof username !== "string" || typeof password !== "string") return null;
        if (!username.trim() || !password.trim()) return null;

        if (
          !constantTimeCompare(username.trim(), envUser) ||
          !constantTimeCompare(password, envPass)
        )
          return null;

        return { id: "1", name: envUser };
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: SEVEN_DAYS },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
};
