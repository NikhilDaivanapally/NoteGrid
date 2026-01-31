"use client";

import useRegister from "../../hooks/use-register";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EmailVerification from "../../shared/components/email-verification";
import RegisterFormView from "./register-form.view";
import { registerSchema } from "../../validation";
import { RegisterFormData } from "../../types";
import { useEffect } from "react";
import { applyServerErrors } from "../../shared/apply-server-errors";

const RegisterFormContainer = () => {
  const { register, status } = useRegister();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (status.type === "field-error")
      applyServerErrors<RegisterFormData>(form, status.fieldErrors);
  }, [status]);

  const onSubmit = async (data: RegisterFormData) => {
    await register(data);
  };

  if (status.type == "verify-email") {
    return <EmailVerification email={status.email} />;
  }

  return (
    <RegisterFormView form={form} onSubmit={form.handleSubmit(onSubmit)} />
  );
};

export default RegisterFormContainer;
