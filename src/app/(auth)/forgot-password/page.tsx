import ForgotPasswordForm from "@/components/forms/forgot-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgotpassword",
};
const page = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <ForgotPasswordForm />
    </div>
  );
};

export default page;
