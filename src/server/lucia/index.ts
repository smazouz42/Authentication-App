import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma as prismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "../db";

export const auth = lucia({
  adapter: prismaAdapter(prisma, {
    session: "session",
    user: "user",
    key: "key",
  }),
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (data) => {
    return {
      username: data.username,
      email: data.email,
    };
  },
});

export type Auth = typeof auth;
