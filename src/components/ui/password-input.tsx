"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type PasswordInputProps = {
  control: any;
  name: "password" | "confirmPassword";
  label: string;
};

export function PasswordInput({ control, name, label }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const Icon = showPassword ? EyeOffIcon : EyeIcon;
  const isPassword = name === "password";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="pr-9"
                aria-invalid={!!fieldState.error}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute inset-y-1/2 right-1 size-7 -translate-y-1/2"
                onClick={() => setShowPassword((p) => !p)}
              >
                <Icon className="size-5" />
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </FormControl>

          {isPassword && (
            <p className="text-xs text-muted-foreground">
              Must be at least 8 characters and include uppercase, lowercase,
              number, and special character.
            </p>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
