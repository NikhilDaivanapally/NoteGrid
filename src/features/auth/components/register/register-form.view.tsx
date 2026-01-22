"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
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
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import SocialAuthButtons from "../../shared/components/social-auth-buttons";

type Props = {
  form: any;
  onSubmit: (data: any) => void;
};

const RegisterFormView = ({ form, onSubmit }: Props) => {
  return (
    <Card className="w-full shadow-none border-none max-w-sm bg-background">
      <CardHeader className="text-center">
        <CardTitle asChild>
          <h1 className="text-2xl"> Create your account</h1>
        </CardTitle>
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <Input placeholder="johndoe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PasswordInput
                name="password"
                label="Password"
                control={form.control}
                showHints={true}
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
                    Login
                  </Link>
                </FieldDescription>
              </Field>
            </form>
          </Form>
        </FieldGroup>
      </CardContent>
    </Card>
  );
};

export default RegisterFormView;
