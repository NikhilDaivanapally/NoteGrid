import { betterAuth } from "better-auth";
import connectToDatabase from "../../db/mongoose";
import mongoose from "mongoose";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Db } from "mongodb";
import { lastLoginMethod } from "better-auth/plugins";
import { sendVerifyEmail } from "../emails/sendVerifyEmail";
import { nextCookies } from "better-auth/next-js";
import { sendResetPasswordEmail } from "../emails/sendResetPasswordEmail";

await connectToDatabase();

const client = mongoose?.connection.getClient();
const db = mongoose.connection.db as Db;

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendResetPasswordEmail({ user, url });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerifyEmail({ user, url });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  advanced: {
    cookiePrefix: "notegrid",
  },
  plugins: [lastLoginMethod(), nextCookies()],
});
