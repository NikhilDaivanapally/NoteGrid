import { resetPassword as sendResetPassword } from "../server/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AuthStatus, ResetPasswordFormData } from "../types";
import { useState } from "react";

const useResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? undefined;

  const [status, setStatus] = useState<AuthStatus>({ type: "idle" });

  const resetPassword = async (data: ResetPasswordFormData) => {
    if (!token) {
      setStatus({ type: "error", message: "Invalid or Reset link expired" });
      return;
    }

    try {
      const response = await sendResetPassword({ ...data, token });

      // SUCCESS
      if (response?.success) {
        toast.success(response.message ?? "Password reset successful");
        router.replace("/login");
        return;
      }

      // INVALID TOKEN
      if (response?.error?.code === "INVALID_TOKEN") {
        setStatus({ type: "error", message: "Reset link expired" });
        return;
      }

      // FIELD ERRORS
      if (response.fieldErrors) {
        setStatus({
          type: "field-error",
          fieldErrors: response.fieldErrors,
        });
        return;
      }

      // GENERIC ERROR
      toast.error(response.message ?? "Failed to reset the password");
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
      toast.error("Something went wrong. Please try again.");
    }
  };
  return { status, resetPassword };
};

export default useResetPassword;
