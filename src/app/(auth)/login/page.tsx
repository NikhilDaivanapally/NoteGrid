import LoginForm from "@/components/forms/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};
const page = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default page;
