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

import { loginSchema } from "@/lib/validations";
import { PasswordInput } from "../ui/password-input";
import { loginUser } from "@/server/users";
import { useRouter } from "next/navigation";
import { verifyEmail as sendVerificationEmail } from "@/server/users";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const [verifyEmail, setVerifyEmail] = useState<string | null>(null);
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const loginResponse = await loginUser(data);

      if (loginResponse.success) {
        router.push("/dashboard");
        return;
      }

      if (loginResponse.error?.code === "EMAIL_NOT_VERIFIED") {
        const resendResponse = await sendVerificationEmail(data.email);

        if (resendResponse?.success) {
          toast.success(resendResponse.message ?? "Verification email resent!");
          setVerifyEmail(data.email);
        } else {
          toast.error(
            resendResponse?.message ?? "Failed to resend verification email"
          );
        }
        return;
      }

      // Fallback for other auth failures
      toast.error(loginResponse.message ?? "Invalid email or password");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (!verifyEmail) {
    return (
      <Card className="w-full shadow-none border-none max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password below to sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <SocialAuthButtons />

          <FieldGroup>
            <FieldSeparator>Or continue with</FieldSeparator>
          </FieldGroup>

          <Form {...form}>
            <FieldGroup>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                noValidate
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@example.com"
                          autoComplete="email"
                          {...field}
                        />
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

                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>

                {form.formState.errors.root?.message && (
                  <p className="text-sm text-destructive text-center">
                    {form.formState.errors.root.message}
                  </p>
                )}

                <Field>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting && (
                      <Spinner className="mr-2 size-4" />
                    )}
                    Login
                  </Button>

                  <FieldDescription className="flex justify-center gap-2">
                    Don't have an account?
                    <Link href="/register">Create</Link>
                  </FieldDescription>
                </Field>
              </form>
            </FieldGroup>
          </Form>
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

export default LoginForm;
