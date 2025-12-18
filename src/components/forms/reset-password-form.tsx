"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldDescription } from "@/components/ui/field";
import Link from "next/link";
import { resetPasswordSchema } from "@/lib/validations";
import { PasswordInput } from "../ui/password-input";
import { resetPassword } from "@/server/users";
import { toast } from "sonner";

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? undefined;

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Invalid or expired reset link");
      return;
    }

    try {
      const response = await resetPassword({ ...data, token });
      // SUCCESS
      if (response?.success) {
        toast.success(response.message ?? "Password reset successful");
        router.replace("/login");
        return;
      }

      // FIELD ERRORS (validation)
      if (response?.fieldErrors) {
        const fields = Object.keys(response.fieldErrors) as Array<
          keyof ResetPasswordFormData
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
      if (response?.error?.code === "INVALID_TOKEN") {
        toast.error("Reset link has expired");
        router.replace("/forgot-password");
        return;
      }
      // FALLBACK ERROR
      toast.error(response?.message ?? "Failed to reset the password");
    } catch (error) {
      toast.error("Failed to reset the password");
    }
  };

  return (
    <Card className="w-[400px] shadow-none border-none">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl">
          {token ? "Reset Password" : "Invalid Reset Link"}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {token
            ? " Enter your new password below to reset your account."
            : "Please request a new password reset."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {token ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <PasswordInput
                name="password"
                label="New Password"
                control={form.control}
                showHints={true}
              />
              <PasswordInput
                name="confirmPassword"
                label="Confirm New Password"
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
                    "Reset Password"
                  )}
                </Button>
                <FieldDescription className="flex justify-center items-center gap-2">
                  Remember your password ?<Link href={"/login"}>Login</Link>
                </FieldDescription>
              </Field>
            </form>
          </Form>
        ) : (
          <Button
            onClick={() => router.push("/forgot-password")}
            className="w-full"
          >
            Request New Reset
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
