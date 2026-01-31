"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../../hooks/use-login";
import EmailVerification from "../../shared/components/email-verification";
import { LoginFormView } from "./login-form.view";
import { applyServerErrors } from "../../shared/apply-server-errors";
import { useEffect } from "react";
import { LoginFormData } from "../../types";
import { loginSchema } from "../../validation";

export const LoginFormContainer = () => {
  const { login, status } = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (status.type === "field-error")
      applyServerErrors<LoginFormData>(form, status.fieldErrors);
  }, [status]);

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  if (status.type == "verify-email") {
    return <EmailVerification email={status.email} />;
  }

  return <LoginFormView form={form} onSubmit={onSubmit} />;
};
