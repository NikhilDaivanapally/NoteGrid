"use client";

import { registerUser } from "@/server/users";
import { useState } from "react";
import { toast } from "sonner";

const useRegister = () => {
  const [verifyEmail, setVerifyEmail] = useState<string | null>(null);

  const register = async (data: {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await registerUser(data);

      // SUCCESS
      if (response?.success) {
        const { email, emailVerified } = response.data.user;

        if (!emailVerified) {
          setVerifyEmail(email);
        }

        toast.success(response.message ?? "Registration successful");
        return;
      }

      if (response.fieldErrors) {
        toast.error(response.message ?? "Please fix the highlighted errors");
        return { fieldErrors: response.fieldErrors };
      }

      // FALLBACK ERROR
      toast.error(response?.message ?? "Registration failed");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };
  return {
    verifyEmail,
    register,
  };
};

export default useRegister;
