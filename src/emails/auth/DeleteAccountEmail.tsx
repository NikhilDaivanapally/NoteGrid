import { Text, Button, Heading } from "@react-email/components";
import { BaseEmail } from "../layouts/BaseEmail";

type DeleteAccountEmailProps = {
  resetUrl: string;
};

export default function DeleteAccountEmail({
  resetUrl,
}: DeleteAccountEmailProps) {
  return (
    <BaseEmail>
      <Text style={{ fontSize: "18px", fontWeight: 600 }}>
        Confirm Account Deletion
      </Text>
      <Text>
        We're sorry to see you go! Please confirm your account deletion by
        clicking the button below:
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
        Confirm Deletion
      </Button>

      <Text>If you don't have an account, please ignore this email.</Text>
    </BaseEmail>
  );
}

DeleteAccountEmail.PreviewProps = {
  resetUrl: "https://example.com/api/auth/delete-user/callback?token=demo",
} as const;
