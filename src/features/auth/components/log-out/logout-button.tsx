"use client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useLogout from "../../hooks/use-logout";

const LogoutButton = () => {
  const { handleLogout, isLoading } = useLogout();

  return (
    <Button
      size={"sm"}
      className="cursor-pointer"
      disabled={isLoading}
      onClick={handleLogout}
    >
      {isLoading ? (
        <>
          <Spinner className="size-4" />
          Logging out...
        </>
      ) : (
        <>
          <LogOut />
          Logout
        </>
      )}
    </Button>
  );
};

export default LogoutButton;
