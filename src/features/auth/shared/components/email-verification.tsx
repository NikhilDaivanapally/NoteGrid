"use client";

import { Button } from "@/components/ui/button";
import { verifyEmail } from "@/server/users";
import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EmailVerification = ({ email }: { email: string }) => {
  const [countdown, setCountdown] = useState(30);
  const [isResending, setIsResending] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = useCallback(() => {
    // Clear any existing intervals before starting a new one
    if (intervalRef.current) clearInterval(intervalRef.current);

    setCountdown(30);
    intervalRef.current = setInterval(() => {
      setCountdown((count) => {
        if (count <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return count - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startCountdown();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startCountdown]);

  const handleResendVerificationEmail = async () => {
    if (countdown > 0 || isResending || !email) return;

    setIsResending(true);

    try {
      const response = await verifyEmail(email);

      if (response?.success) {
        startCountdown();
        toast.success(response.message ?? "Verification email resent!");
      } else {
        toast.error(response?.message ?? "Failed to resend email");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card className="w-[400px] shadow-none border-none">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl">
          <h1 className="text-xl">Verify your email</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            We've sent a verification email to{" "}
            <span className="font-medium text-black">{email}</span>. Please
            check your email and click the link to activate your account.
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder.
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={countdown > 0 || isResending}
            onClick={handleResendVerificationEmail}
          >
            {isResending ? (
              <>Resending ...</>
            ) : countdown > 0 ? (
              <>Resend in {countdown}s</>
            ) : (
              <>Resend verification email </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailVerification;
