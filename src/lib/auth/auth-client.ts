import { createAuthClient } from "better-auth/react";
import {
  lastLoginMethodClient,
  twoFactorClient,
  adminClient,
} from "better-auth/client/plugins";
import { admin, user, ac } from "@/components/auth/permission";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [
    lastLoginMethodClient(),
    twoFactorClient(),
    adminClient({
      ac,
      roles: {
        admin,
        user,
      },
    }),
  ],
});
