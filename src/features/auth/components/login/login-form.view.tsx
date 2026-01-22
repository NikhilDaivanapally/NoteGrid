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

export const LoginFormView = ({ form, onSubmit }: Props) => {
  return (
    <Card className="w-full shadow-none border-none max-w-sm bg-background">
      <CardHeader className="text-center">
        <CardTitle asChild>
          <h1 className="text-2xl">Welcome back</h1>
        </CardTitle>

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
                        placeholder="johndoe@example.com"
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
                  Forgot password
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
};
