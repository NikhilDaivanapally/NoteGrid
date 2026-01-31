"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "../../hooks/use-forgot-password";
import ForgotPasswordFormView from "./forgot-password-form.view";
import ForgotPasswordEmailSent from "./forgot-password-email-sent";
import { forgotPasswordSchema } from "../../validation";
import { ForgotPasswordFormData } from "../../types";

const ForgotPasswordFormContainer = () => {
  const { status, setStatus, forgotPassword } = useForgotPassword();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const handleReset = () => {
    setStatus({ type: "email-sent" });
    form.reset();
  };

  if (status.type === "email-sent") {
    return <ForgotPasswordEmailSent resetState={handleReset} />;
  }
  return <ForgotPasswordFormView form={form} onSubmit={forgotPassword} />;
};

export default ForgotPasswordFormContainer;
