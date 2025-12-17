import { sendEmail } from "./mailer";
import VerifyEmail from "@/emails/auth/VerifyEmail";

type SendVerifyEmailProps = {
  user: {
    name: string;
    email: string;
  };
  url: string;
};

export async function sendVerifyEmail({ user, url }: SendVerifyEmailProps) {
  const emailComponent = <VerifyEmail verifyUrl={url} />;
  await sendEmail({
    to: user.email,
    subject: "Verify your email",
    react: emailComponent,
  });
}
