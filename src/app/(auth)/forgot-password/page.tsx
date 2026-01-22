import ForgotPasswordFormContainer from "@/features/auth/components/forgot-password/forgot-password-form.container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgotpassword",
};
const page = () => {
  return <ForgotPasswordFormContainer />;
};

export default page;
