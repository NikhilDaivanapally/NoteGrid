"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

import {
  SUPPORTED_OAUTH_PROVIDER_DETAILS,
  SUPPORTED_OAUTH_PROVIDERS,
} from "@/lib/auth/o-auth-providers";
import { authClient } from "@/lib/auth/auth-client";

interface SocialAuthButtonsProps {
  callbackURL?: string;
  onSuccess?: (provider: string) => void;
  onError?: (provider: string, error: string) => void;
}

const GENERIC_AUTH_ERROR = "Login failed. Please try again.";

const handleAuthSuccess = (provider: string) => {};

const handleAuthError = (provider: string, error: string) => {
  const message = provider
    ? `${provider} login-in failed. Please try again.`
    : GENERIC_AUTH_ERROR;

  toast.error(message);
};

const SocialAuthButtons = ({
  callbackURL = process.env.LOGIN_SUCCESS_CALLBACK_URL ?? "/dashboard",
  onSuccess = handleAuthSuccess,
  onError = handleAuthError,
}: SocialAuthButtonsProps) => {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const isMountedRef = useRef(true);
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const lastUsedMethod =
    authClient.getLastUsedLoginMethod()?.toLowerCase() ?? null;

  const handleSignIn = useCallback(
    async (provider: string) => {
      if (loadingProvider) return;

      setLoadingProvider(provider);

      try {
        const { error } = await authClient.signIn.social({
          provider,
          callbackURL,
        });

        if (error) {
          throw new Error("AUTH_FAILED");
        }

        onSuccess(provider);
      } catch {
        // Always show generic error to user
        onError(provider, GENERIC_AUTH_ERROR);
        setLoadingProvider(null);
      } finally {
        if (isMountedRef.current) {
          setLoadingProvider(null);
        }
      }
    },
    [loadingProvider, callbackURL, onSuccess, onError],
  );

  return (
    <FieldGroup className="gap-4">
      {SUPPORTED_OAUTH_PROVIDERS.map((provider) => {
        const { Icon, name } = SUPPORTED_OAUTH_PROVIDER_DETAILS[provider];

        const isLoading = loadingProvider === provider;

        const content = isLoading
          ? {
              icon: <Spinner className="h-5 w-5" />,
              text: `Logging in with ${name}...`,
            }
          : {
              icon: <Icon className="mr-2 h-4 w-4" />,
              text: `Continue with ${name}`,
            };

        const isLastUsedMethod = lastUsedMethod === provider.toLowerCase();

        return (
          <Field key={provider}>
            <Button
              variant="outline"
              onClick={() => handleSignIn(provider)}
              disabled={isLoading}
              className="w-full relative"
            >
              {!isLoading && isLastUsedMethod && (
                <Badge
                  variant="secondary"
                  className="absolute max-w-fit right-1 rounded-sm"
                >
                  Last used
                </Badge>
              )}
              {content.icon}
              <span className="capitalize">{content.text}</span>
            </Button>
          </Field>
        );
      })}
    </FieldGroup>
  );
};

export default SocialAuthButtons;
