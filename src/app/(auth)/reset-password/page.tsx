import ResetPasswordForm from "@/components/forms/reset-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ResetPassword",
};
const page = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <ResetPasswordForm />
    </div>
  );
};

export default page;
