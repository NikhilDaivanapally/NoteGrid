import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Field, FieldDescription } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
type Props = {
  form: any;
  onSubmit: (data: any) => void;
};

const ResetPasswordFormView = ({ form, onSubmit }: Props) => {
  return (
    <Card className="w-full shadow-none border-none max-w-sm bg-background">
      <CardHeader className="text-center space-y-1">
        <CardTitle asChild>
          <h1 className="text-2xl">Reset Password</h1>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Enter your new password below to reset your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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
      </CardContent>
    </Card>
  );
};

export default ResetPasswordFormView;
