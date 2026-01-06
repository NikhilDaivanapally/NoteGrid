import { Text, Button } from "@react-email/components";
import { BaseEmail } from "../layouts/BaseEmail";

export default function VerifyEmail({ verifyUrl }: { verifyUrl: string }) {
  return (
    <BaseEmail>
      <Text>Welcome 👋</Text>
      <Text>Please verify your email address.</Text>
      <Button
        href={verifyUrl}
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "12px 16px",
          borderRadius: "6px",
        }}
      >
        Verify Email
      </Button>
    </BaseEmail>
  );
}

VerifyEmail.PreviewProps = {
  verifyUrl: "https://example.com",
} as const;
