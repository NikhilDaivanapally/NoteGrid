"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import SocialAuthButtons from "../social-auth-buttons";
import EmailVerification from "../auth/email-verification";

import { registerUser } from "@/server/users";
import { registerSchema } from "@/lib/validations";
import { PasswordInput } from "../ui/password-input";

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [verifyEmail, setVerifyEmail] = useState<string | null>(null);

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
    try {
      const response = await registerUser(data);

      // SUCCESS
      if (response?.success) {
        const { email, emailVerified } = response.data.user;

        if (!emailVerified) {
          setVerifyEmail(email);
        }

        toast.success(response.message ?? "Registration successful");
        return;
      }

      // FIELD ERRORS (validation)
      if (response?.fieldErrors) {
        const fields = Object.keys(response.fieldErrors) as Array<
          keyof RegisterFormData
        >;

        if (fields.length > 0) {
          form.setFocus(fields[0]);
        }

        fields.forEach((field) => {
          const message = response.fieldErrors?.[field]?.[0];
          if (!message) return;

          form.setError(field, {
            type: "server",
            message,
          });
        });

        toast.error(response.message ?? "Please fix the highlighted errors");
        return;
      }

      // FALLBACK ERROR
      toast.error(response?.message ?? "Registration failed");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (!verifyEmail) {
    return (
      <Card className="w-full shadow-none border-none max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your details to create your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <SocialAuthButtons />

          <FieldGroup>
            <FieldSeparator>Or continue with</FieldSeparator>
          </FieldGroup>

          <FieldGroup>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <PasswordInput
                  name="password"
                  label="Password"
                  control={form.control}
                />
                <PasswordInput
                  name="confirmPassword"
                  label="Confirm Password"
                  control={form.control}
                />
                <Field>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <Spinner className="size-6" />
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  <FieldDescription className="flex justify-center items-center gap-2">
                    Already have an account ?
                    <Link href="/login" className="">
                      login
                    </Link>
                  </FieldDescription>
                </Field>
              </form>
            </Form>
          </FieldGroup>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[400px] shadow-none border-none">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl">Verify your email</CardTitle>
      </CardHeader>
      <CardContent>
        <EmailVerification email={verifyEmail} />
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
