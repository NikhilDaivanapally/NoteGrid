import { resetPasswordSchema } from "@/lib/validations";
import { resetPassword as sendResetPassword } from "@/server/users";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const useResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? undefined;

  const resetPassword = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Invalid or expired reset link");
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

      if (response?.error?.code === "INVALID_TOKEN") {
        toast.error("Reset link has expired");
        router.replace("/forgot-password");
        return;
      }

      if (response.fieldErrors) {
        toast.error(response.message ?? "Please fix the highlighted errors");
        return { fieldErrors: response.fieldErrors };
      }

      // FALLBACK ERROR
      toast.error(response?.message ?? "Failed to reset the password");
    } catch (error) {
      toast.error("Failed to reset the password");
    }
  };
  return { token, resetPassword };
};

export default useResetPassword;
