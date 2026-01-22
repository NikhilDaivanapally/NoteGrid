"use client";

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
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldDescription } from "@/components/ui/field";

type Props = {
  form: any;
  onSubmit: (data: any) => void;
};

const ForgotPasswordFormView = ({ form, onSubmit }: Props) => {
  return (
    <Card className="w-full shadow-none border-none max-w-sm bg-background">
      <CardHeader className="text-center space-y-1">
        <CardTitle asChild>
          <h1 className="text-2xl">Forgot Password</h1>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Enter your email address and we'll send you a reset link
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
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

            <Field>
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

export default ForgotPasswordFormView;
