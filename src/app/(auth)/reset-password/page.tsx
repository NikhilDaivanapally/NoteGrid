import { Spinner } from "@/components/ui/spinner";
import ResetPasswordFormContainer from "@/features/auth/components/reset-password/reset-password-form.container";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ResetPassword",
};
const page = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full grid place-items-center">
          <Spinner className="size-10" />
        </div>
      }
    >
      <ResetPasswordFormContainer />
    </Suspense>
  );
};

export default page;
