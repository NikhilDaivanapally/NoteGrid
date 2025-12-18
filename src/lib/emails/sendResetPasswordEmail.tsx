import ResetPasswordEmail from "@/emails/auth/ResetPasswordEmail";
import { sendEmail } from "./mailer";

type sendResetPasswordEmailProps = {
  user: {
    name: string;
    email: string;
  };
  url: string;
};

export async function sendResetPasswordEmail({
  user,
  url,
}: sendResetPasswordEmailProps) {
  const emailComponent = <ResetPasswordEmail resetUrl={url} />;
  await sendEmail({
    to: user.email,
    subject: "Reset your password",
    react: emailComponent,
  });
}
