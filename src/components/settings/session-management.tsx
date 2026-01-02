"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth/auth-client";
import { Session } from "better-auth";
import { Monitor, Smartphone, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { UAParser } from "ua-parser-js";
import { Spinner } from "../ui/spinner";

export function SessionManagement({
  sessions,
  currentSessionToken,
}: {
  sessions: Session[];
  currentSessionToken: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const currentSession = sessions.find((s) => s.token === currentSessionToken);
  const otherSessions = sessions.filter((s) => s.token !== currentSessionToken);

  function revokeOtherSessions() {
    let toastId: string | number;
    return authClient.revokeOtherSessions(undefined, {
      onRequest: () => {
        toastId = toast.loading("Revoking all sessions...");
        setIsLoading(true);
      },
      onSuccess: () => {
        setIsLoading(false);
        toast.success("All sessions revoked", {
          id: toastId,
          description: "You have been logged out of all other devices.",
        });
        router.refresh();
      },
      onError: () => {
        toast.error("Bulk action failed", {
          id: toastId,
          description: "Could not revoke all sessions. Please try again later.",
        });
        setIsLoading(false);
      },
    });
  }

  return (
    <div className="space-y-6">
      {currentSession && (
        <SessionCard session={currentSession} isCurrentSession />
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Other Active Sessions</h3>
          {otherSessions.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={revokeOtherSessions}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner className="size-5" />
              ) : (
                "Revoke Other Sessions"
              )}
            </Button>
          )}
        </div>

        {otherSessions.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No other active sessions
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {otherSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SessionCard({
  session,
  isCurrentSession = false,
}: {
  session: Session;
  isCurrentSession?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const userAgentInfo = session.userAgent ? UAParser(session.userAgent) : null;

  function getBrowserInformation() {
    if (userAgentInfo == null) return "Unknown Device";
    if (userAgentInfo.browser.name == null && userAgentInfo.os.name == null) {
      return "Unknown Device";
    }
    if (userAgentInfo.browser.name == null) return userAgentInfo.os.name;
    if (userAgentInfo.os.name == null) return userAgentInfo.browser.name;

    return `${userAgentInfo.browser.name}, ${userAgentInfo.os.name}`;
  }

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  }

  function revokeSession() {
    return authClient.revokeSession(
      {
        token: session.token,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          toast.success("Session revoked", {
            description: "This device has been logged out successfully.",
          });
          router.refresh();
        },
        onError: () => {
          setIsLoading(false);
          toast.error("Failed to revoke session", {
            description: "Please try again or check your connection.",
          });
        },
      }
    );
  }
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle>{getBrowserInformation()}</CardTitle>
        {isCurrentSession && <Badge>Current Session</Badge>}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {userAgentInfo?.device.type === "mobile" ? (
              <Smartphone />
            ) : (
              <Monitor />
            )}
            <div>
              <p className="text-sm text-muted-foreground">
                Created: {formatDate(session.createdAt)}
              </p>
              <p className="text-sm text-muted-foreground">
                Expires: {formatDate(session.expiresAt)}
              </p>
            </div>
          </div>
          {!isCurrentSession && (
            <Button
              variant="destructive"
              size="sm"
              onClick={revokeSession}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : <Trash2 />}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
