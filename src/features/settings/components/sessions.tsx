import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { Card, CardContent } from "@/components/ui/card";
import { SessionManagement } from "./session-management";

export async function Sessions({
  currentSessionToken,
}: {
  currentSessionToken: string;
}) {
  const sessions = await auth.api.listSessions({ headers: await headers() });

  return (
    <Card className="p-0">
      <CardContent className="p-4">
        <SessionManagement
          sessions={sessions}
          currentSessionToken={currentSessionToken}
        />
      </CardContent>
    </Card>
  );
}
