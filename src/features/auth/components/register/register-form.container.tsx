"use client";

import { registerSchema } from "@/lib/validations";
import useRegister from "../../hooks/use-register";
import z from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import EmailVerification from "../../shared/components/email-verification";
import RegisterFormView from "./register-form.view";

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterFormContainer = () => {
  const { register, verifyEmail } = useRegister();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const result = await register(data);

    // FIELD ERRORS (server)
    if (result?.fieldErrors) {
      const fields = Object.keys(result.fieldErrors) as Array<
        keyof RegisterFormData
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

  return (
    <RegisterFormView form={form} onSubmit={form.handleSubmit(onSubmit)} />
  );
};

export default RegisterFormContainer;
