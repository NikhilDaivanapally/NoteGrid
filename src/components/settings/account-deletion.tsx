"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { MailWarning, Trash } from "lucide-react";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { useGetUserQuery } from "@/store/api/userApi";

export function AccountDeletion() {
  const { data: user } = useGetUserQuery({});

  const [isPending, setIsPending] = useState(false);
  const handleClick = async () => {
    setIsPending(true);
    try {
      await authClient.deleteUser({ callbackURL: "/login" });
      setIsPending(false);
      toast.success("Check your email", {
        description: `A confirmation link has been sent to ${user.email}. Your account will remain active until you click it.`,
        duration: 10000, // Long duration because this is important
        icon: <MailWarning className="h-5 w-5 text-yellow-500" />,
      });
    } catch (error) {
      setIsPending(false);
      toast.error("Could not send request", {
        description: "Please try again later or contact support.",
      });
    }
  };
  return (
    <Button variant={"destructive"} className="w-full" onClick={handleClick}>
      {isPending ? (
        <>
          <Spinner /> Sending request...
        </>
      ) : (
        <>
          <Trash />
          Request Permanent Deletion
        </>
      )}
    </Button>
  );
}
