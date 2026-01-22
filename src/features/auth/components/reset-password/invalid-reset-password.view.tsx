"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

const InvalidResetPasswordView = () => {
  return (
    <Card className="w-full shadow-none border-none max-w-sm bg-background">
      <CardHeader className="text-center space-y-1">
        <CardTitle asChild>
          <h1 className="text-2xl">Invalid Reset Link</h1>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Please request a new password reset
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button className="w-full" asChild>
          <Link href={"/forgot-password"}>Request New Reset</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default InvalidResetPasswordView;
