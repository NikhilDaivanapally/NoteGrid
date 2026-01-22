"use client";

import { useState } from "react";
import { toast } from "sonner";
import { forgotPassword as sendForgotPassword } from "@/server/users";
import z from "zod";
import { forgotPasswordSchema } from "@/lib/validations";

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const useForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);

  const forgotPassword = async ({ email }: ForgotPasswordFormData) => {
    try {
      const response = await sendForgotPassword(email);
      if (response.success) {
        setEmailSent(true);
        toast.success(
          response.message ||
            "If an account exists for this email, a password reset link has been sent.",
        );
      }
      if (!response.success) {
        toast.error(response?.message || "Failed to send password reset email");
      }
    } catch (error: unknown) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return {
    emailSent,
    setEmailSent,
    forgotPassword,
  };
};
