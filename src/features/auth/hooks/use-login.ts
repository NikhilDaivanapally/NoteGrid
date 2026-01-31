"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  loginUser,
  verifyEmail as sendVerificationEmail,
} from "../server/actions";
import { AuthStatus, LoginFormData } from "../types";

export const useLogin = () => {
  const router = useRouter();
  const [status, setStatus] = useState<AuthStatus>({ type: "idle" });

  const login = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data);

      if (response.success) {
        router.push("/dashboard");
        setStatus({ type: "idle" });
        return;
      }

      // EMAIL NOT VERIFIED
      if (response.error?.code === "EMAIL_NOT_VERIFIED") {
        const resend = await sendVerificationEmail(data.email);

        if (resend?.success) {
          toast.success(resend.message);
          setStatus({ type: "verify-email", email: data.email });
        } else {
          setStatus({
            type: "error",
            message: resend?.message ?? "Failed to send verification email",
          });
          toast.error(resend?.message);
        }
        return;
      }

      // FIELD ERRORS
      if (response.fieldErrors) {
        setStatus({
          type: "field-error",
          fieldErrors: response.fieldErrors,
        });
        toast.error(response.message ?? "Please fix the highlighted errors");
        return;
      }

      // GENERIC ERROR
      setStatus({
        type: "error",
        message: response.message ?? "Invalid credentials",
      });
      toast.error(response.message ?? "Invalid credentials");
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
      toast.error("Something went wrong. Please try again.");
    }
  };

  return {
    status,
    login,
  };
};
