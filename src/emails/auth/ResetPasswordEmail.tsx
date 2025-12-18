import { Text, Button } from "@react-email/components";
import { BaseEmail } from "../layouts/BaseEmail";

type ResetPasswordEmailProps = {
  resetUrl: string;
};

export default function ResetPasswordEmail({
  resetUrl,
}: ResetPasswordEmailProps) {
  return (
    <BaseEmail>
      <Text style={{ fontSize: "18px", fontWeight: 600 }}>
        Reset your password
      </Text>

      <Text>
        We received a request to reset your password. Click the button below to
        choose a new one.
      </Text>

      <Button
        href={resetUrl}
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "12px 18px",
          borderRadius: "6px",
          textDecoration: "none",
          display: "inline-block",
          marginTop: "12px",
        }}
      >
        Reset password
      </Button>

      <Text style={{ fontSize: "14px", color: "#666", marginTop: "20px" }}>
        If you didn't request a password reset, you can safely ignore this
        email. Your password will remain unchanged.
      </Text>
    </BaseEmail>
  );
}

ResetPasswordEmail.PreviewProps = {
  resetUrl: "https://example.com/reset-password?token=demo",
} as const;
