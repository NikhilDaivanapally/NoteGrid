import RegisterForm from "@/components/forms/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};
const page = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <RegisterForm />
    </div>
  );
};

export default page;
