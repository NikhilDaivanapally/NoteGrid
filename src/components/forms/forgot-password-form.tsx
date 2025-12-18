"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { forgotPassword } from "@/server/users";
import { forgotPasswordSchema } from "@/lib/validations";

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async ({ email }: ForgotPasswordFormData) => {
    try {
      const response = await forgotPassword(email);
      if (response.success) {
        setEmailSent(true);
        toast.success(
          response.message ||
            "If an account exists for this email, a password reset link has been sent."
        );
      }
      if (!response.success) {
        toast.error(response?.message || "Failed to send password reset email");
      }
    } catch (error: unknown) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Card className="w-[400px] shadow-none border-none">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {emailSent
            ? "Check your inbox for the reset link."
            : "Enter your email address and we'll send you a reset link."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {emailSent ? (
          <div className="space-y-4 text-center">
            <p className="text-sm text-muted-foreground">
              Didn't receive the email? Check your spam folder or try again.
            </p>

            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                setEmailSent(false);
                form.reset();
              }}
            >
              Try another email
            </Button>

            <Link
              href="/login"
              className="block text-sm text-primary underline"
            >
              Back to login
            </Link>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Spinner className="size-6" />
                ) : (
                  "Send reset link"
                )}
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Remember your password?{" "}
                <Link href="/login" className="underline">
                  Login
                </Link>
              </p>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
