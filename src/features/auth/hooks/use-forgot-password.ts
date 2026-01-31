"use client";

import { useState } from "react";
import { toast } from "sonner";
import { forgotPassword as sendForgotPassword } from "../server/actions";
import { AuthStatus, ForgotPasswordFormData } from "../types";

export const useForgotPassword = () => {
  const [status, setStatus] = useState<AuthStatus | { type: "email-sent" }>({
    type: "idle",
  });

  const forgotPassword = async ({ email }: ForgotPasswordFormData) => {
    try {
      const response = await sendForgotPassword(email);

      if (response.success) {
        setStatus({ type: "idle" });
        toast.success(
          response.message ||
            "If an account exists for this email, a password reset link has been sent.",
        );
        return;
      }

      if (!response.success) {
        // FIELD ERRORS
        if (response.fieldErrors) {
          setStatus({
            type: "field-error",
            fieldErrors: response.fieldErrors,
          });
          toast.error(response.message ?? "Please fix the highlighted errors");
          return;
        }
      }

      // GENERIC ERROR
      setStatus({
        type: "error",
        message: response.message ?? "Failed to send password reset email",
      });
      toast.error(response.message ?? "Failed to send password reset email");
    } catch (error: unknown) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
      toast.error("Something went wrong. Please try again.");
    }
  };

  return {
    status,
    setStatus,
    forgotPassword,
  };
};
