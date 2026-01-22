import { Spinner } from "@/components/ui/spinner";
import ResetPasswordFormContainer from "@/features/auth/components/reset-password/reset-password-form.container";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ResetPassword",
};
const page = () => {
  return <ResetPasswordFormContainer />;
};

export default page;
