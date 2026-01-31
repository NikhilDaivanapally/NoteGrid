"use client";

import { registerUser } from "../server/actions";
import { useState } from "react";
import { toast } from "sonner";
import { AuthStatus, RegisterFormData } from "../types";

const useRegister = () => {
  const [status, setStatus] = useState<AuthStatus>({ type: "idle" });

  const register = async (data: RegisterFormData) => {
    try {
      const response = await registerUser(data);

      if (response?.success) {
        const { email, emailVerified } = response.data.user;

        // EMAIL NOT VERIFIED
        if (!emailVerified) {
          setStatus({ type: "verify-email", email: email });
        }

        toast.success(response.message ?? "Registration successful");
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
        message: response.message ?? "Registration failed",
      });
      toast.error(response.message ?? "Registration failed");
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
    register,
  };
};

export default useRegister;
