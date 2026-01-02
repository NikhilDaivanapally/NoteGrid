import { betterAuth } from "better-auth";
import connectToDatabase from "../../db/mongoose";
import mongoose from "mongoose";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Db } from "mongodb";
import { admin as adminPlugin, lastLoginMethod } from "better-auth/plugins";
import { sendVerifyEmail } from "../emails/sendVerifyEmail";
import { nextCookies } from "better-auth/next-js";
import { sendResetPasswordEmail } from "../emails/sendResetPasswordEmail";
import { ac, admin, user } from "@/components/auth/permission";
import { twoFactor } from "better-auth/plugins/two-factor";
import { sendDeleteAccountVerificationEmail } from "../emails/sendDeleteAccountVerificationEmail";
import { cleanupUserNotes } from "@/server/notes";

await connectToDatabase();

const client = mongoose?.connection.getClient();
const db = mongoose.connection.db as Db;

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        await sendDeleteAccountVerificationEmail({ user, url });
      },
      beforeDelete: async (user) => {
        // Perform a cleanup for notes related to user
        try {
          await cleanupUserNotes(user.id);
        } catch (error) {
          throw new Error("Failed to clean up user data");
        }
      },
    },
  },
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
  plugins: [
    lastLoginMethod(),
    twoFactor(),
    adminPlugin({
      ac,
      roles: {
        admin,
        user,
      },
      adminUserIds: ["69577dbefa80aedfc712d9e6"],
    }),
    nextCookies(),
  ],
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Get string from env, default to "notegrid.note@gmail.com"
          const adminString =
            process.env.ADMIN_EMAILS || "notegrid.note@gmail.com";

          // Convert "email1,email2" into ['email1','email2']
          const adminList = adminString.split(",").map((email) => email.trim());

          // Check if the signing-up user is in that list
          if (adminList.includes(user.email)) {
            return {
              data: {
                ...user,
                role: "admin",
              },
            };
          }
          return { data: user };
        },
      },
    },
  },
});
