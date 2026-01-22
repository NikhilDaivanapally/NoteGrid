"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations";
import { useLogin } from "../../hooks/use-login";
import EmailVerification from "../../shared/components/email-verification";
import z from "zod";
import { LoginFormView } from "./login-form.view";

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginFormContainer = () => {
  const { login, verifyEmail } = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await login(data);

    // FIELD ERRORS (server)
    if (result?.fieldErrors) {
      const fields = Object.keys(result.fieldErrors) as Array<
        keyof LoginFormData
      >;

      if (fields.length > 0) {
        form.setFocus(fields[0]);
      }

      fields.forEach((field) => {
        const message = result.fieldErrors?.[field]?.[0];
        if (!message) return;

        form.setError(field, {
          type: "server",
          message,
        });
      });

      return;
    }
  };

  if (verifyEmail) {
    return <EmailVerification email={verifyEmail} />;
  }

  return <LoginFormView form={form} onSubmit={onSubmit} />;
};
