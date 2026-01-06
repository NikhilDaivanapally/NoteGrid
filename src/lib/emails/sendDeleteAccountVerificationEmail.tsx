import ResetPasswordEmail from "@/emails/auth/ResetPasswordEmail";
import { sendEmail } from "./mailer";
import DeleteAccountEmail from "@/emails/auth/DeleteAccountEmail";

type deleteAccountVerificationProps = {
  user: {
    name: string;
    email: string;
  };
  url: string;
};

export async function sendDeleteAccountVerificationEmail({
  user,
  url,
}: deleteAccountVerificationProps) {
  const emailComponent = <DeleteAccountEmail resetUrl={url} />;
  await sendEmail({
    to: user.email,
    subject: "Delete your account",
    react: emailComponent,
  });
}
