import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth/auth";
import { Key, LinkIcon, Shield, Trash2, User } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

import Security from "./security";
import { ProfileUpdateForm } from "./profile-update";
import { Sessions } from "./sessions";
import { AccountDeletion } from "./account-deletion";
import { LinkedAccounts } from "./linked-account";
import LogoutButton from "@/features/auth/components/log-out/logout-button";

function LoadingSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Spinner className="size-10" />}>{children}</Suspense>
  );
}

const SettingsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session == null) return redirect("/login");

  return (
    <div className="w-full h-full p-4 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <div className="size-16 bg-muted rounded-full flex items-center justify-center overflow-hidden">
          {session.user.image ? (
            <Image
              width={64}
              height={64}
              src={session.user.image}
              alt="User Avatar"
              className="object-cover"
            />
          ) : (
            <User className="size-8 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex gap-1 justify-between items-start">
            <h1 className="text-3xl font-bold flex items-center gap-1.5">
              {session.user.name || "User Profile"}
              <Badge>{session.user?.role ?? "admin"}</Badge>
            </h1>
            <LogoutButton />
          </div>
          <p className="text-muted-foreground">{session.user.email}</p>
        </div>
      </div>
      <Tabs className="space-y-2" defaultValue="profile">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">
            <User />
            <span className="max-sm:hidden">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield />
            <span className="max-sm:hidden">Security</span>
          </TabsTrigger>
          <TabsTrigger value="sessions">
            <Key />
            <span className="max-sm:hidden">Sessions</span>
          </TabsTrigger>

          <TabsTrigger value="accounts">
            <LinkIcon />
            <span className="max-sm:hidden">Accounts</span>
          </TabsTrigger>

          <TabsTrigger value="danger">
            <Trash2 />
            <span className="max-sm:hidden">Danger</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardContent>
              <ProfileUpdateForm user={session.user} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <LoadingSuspense>
            <Security email={session.user.email} />
          </LoadingSuspense>
        </TabsContent>

        <TabsContent value="sessions">
          <LoadingSuspense>
            <Sessions currentSessionToken={session.session.token} />
          </LoadingSuspense>
        </TabsContent>

        <TabsContent value="accounts">
          <LoadingSuspense>
            <LinkedAccounts />
          </LoadingSuspense>
        </TabsContent>

        <TabsContent value="danger">
          <Card className="border border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <AccountDeletion />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
