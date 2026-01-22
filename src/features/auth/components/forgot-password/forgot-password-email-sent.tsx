import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

type Props = {
  resetState: () => void;
};

const ForgotPasswordEmailSent = ({ resetState }: Props) => {
  return (
    <Card className="w-full shadow-none border-none max-w-sm bg-background">
      <CardHeader className="text-center space-y-1">
        <CardTitle asChild>
          <h1 className="text-2xl">Forgot Password</h1>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Check your inbox for the reset link
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder or try again.
          </p>

          <Button variant="secondary" className="w-full" onClick={resetState}>
            Try another email
          </Button>

          <Link href="/login" className="block text-sm text-primary underline">
            Back to login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordEmailSent;
