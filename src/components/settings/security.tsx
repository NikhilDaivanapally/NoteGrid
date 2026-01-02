import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChangePasswordForm } from "../forms/change-password-form";
import SendResetPasswordButton from "./send-reset-password-btn";

async function Security({ email }: { email: string }) {
  const [accounts] = await Promise.all([
    auth.api.listUserAccounts({ headers: await headers() }),
  ]);

  const hasPasswordAccount = accounts.some(
    (a) => a.providerId === "credential"
  );
  return (
    <div>
      {hasPasswordAccount ? (
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your password for improved security.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Set Password</CardTitle>
            <CardDescription>
              We will send you a password reset email to set up a password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SendResetPasswordButton email={email} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Security;
