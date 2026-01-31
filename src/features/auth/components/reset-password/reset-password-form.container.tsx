"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ResetPasswordFormView from "./reset-password-form.view";
import useResetPassword from "../../hooks/use-reset-password";
import InvalidResetPasswordView from "./invalid-reset-password.view";
import { resetPasswordSchema } from "../../validation";
import { ResetPasswordFormData } from "../../types";
import { useEffect } from "react";
import { applyServerErrors } from "../../shared/apply-server-errors";

const ResetPasswordFormContainer = () => {
  const { status, resetPassword } = useResetPassword();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (status.type === "field-error")
      applyServerErrors<ResetPasswordFormData>(form, status.fieldErrors);
  }, [status]);

  if (status.type === "error") return <InvalidResetPasswordView />;

  return <ResetPasswordFormView form={form} onSubmit={resetPassword} />;
};

export default ResetPasswordFormContainer;
