import RegisterFormContainer from "@/features/auth/components/register/register-form.container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};
const page = () => {
  return <RegisterFormContainer />;
};

export default page;
