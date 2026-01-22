"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPasswordSchema } from "@/lib/validations";
import ResetPasswordFormView from "./reset-password-form.view";
import useResetPassword from "../../hooks/use-reset-password";
import InvalidResetPasswordView from "./invalid-reset-password.view";

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordFormContainer = () => {
  const { token, resetPassword } = useResetPassword();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  if (!token) {
    return <InvalidResetPasswordView />;
  }

  return <ResetPasswordFormView form={form} onSubmit={resetPassword} />;
};

export default ResetPasswordFormContainer;
