"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { forgotPassword } from "@/server/users";
import { z } from "zod";
import { forgotPasswordSchema } from "@/lib/validations";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { Mail } from "lucide-react";

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const SendResetPasswordButton = ({ email }: { email: string }) => {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async ({ email }: ForgotPasswordFormData) => {
    setIsPending(true);
    try {
      const response = await forgotPassword(email);
      if (response.success) {
        setIsPending(false);
        toast.success(
          response.message ||
            "If an account exists for this email, a password reset link has been sent."
        );
      }
      if (!response.success) {
        setIsPending(false);
        toast.error(response?.message || "Failed to send password reset email");
      }
    } catch (error: unknown) {
      setIsPending(false);
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <Button
      variant={"outline"}
      onClick={() => handleClick({ email })}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Spinner />
          Sending link...
        </>
      ) : (
        <>
          <Mail className="mr-2 h-4 w-4" />
          Send Password Reset Email
        </>
      )}
    </Button>
  );
};

export default SendResetPasswordButton;
