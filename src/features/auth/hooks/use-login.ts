"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  loginUser,
  verifyEmail as sendVerificationEmail,
} from "@/server/users";

export const useLogin = () => {
  const router = useRouter();
  const [verifyEmail, setVerifyEmail] = useState<string | null>(null);

  const login = async (data: { email: string; password: string }) => {
    const response = await loginUser(data);

    if (response.success) {
      router.push("/dashboard");
      return;
    }

    if (response.error?.code === "EMAIL_NOT_VERIFIED") {
      const resend = await sendVerificationEmail(data.email);

      if (resend?.success) {
        toast.success(resend.message);
        setVerifyEmail(data.email);
      } else {
        toast.error(resend?.message);
      }
      return;
    }

    if (response.fieldErrors) {
      toast.error(response.message ?? "Please fix the highlighted errors");
      return { fieldErrors: response.fieldErrors };
    }

    toast.error(response.message ?? "Invalid credentials");
  };

  return {
    verifyEmail,
    login,
  };
};
