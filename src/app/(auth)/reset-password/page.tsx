import ResetPasswordForm from "@/components/forms/reset-password-form";
import { Spinner } from "@/components/ui/spinner";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ResetPassword",
};
const page = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Suspense
        fallback={
          <div className="w-full h-full">
            <Spinner className="size-10" />
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
};

export default page;
