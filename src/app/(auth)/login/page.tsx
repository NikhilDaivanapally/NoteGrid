import { LoginFormContainer } from "@/features/auth/components/login/login-form.container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};
const page = () => {
  return <LoginFormContainer />;
};

export default page;
