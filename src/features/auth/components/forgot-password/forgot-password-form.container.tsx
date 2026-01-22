"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { forgotPasswordSchema } from "@/lib/validations";
import { useForgotPassword } from "../../hooks/use-forgot-password";
import ForgotPasswordFormView from "./forgot-password-form.view";
import ForgotPasswordEmailSent from "./forgot-password-email-sent";

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordFormContainer = () => {
  const { emailSent, setEmailSent, forgotPassword } = useForgotPassword();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const handleReset = () => {
    setEmailSent(false);
    form.reset();
  };

  if (emailSent) {
    return <ForgotPasswordEmailSent resetState={handleReset} />;
  }
  return <ForgotPasswordFormView form={form} onSubmit={forgotPassword} />;
};

export default ForgotPasswordFormContainer;
