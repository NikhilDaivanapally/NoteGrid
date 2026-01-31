import z from "zod";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "./validation";

export type ActionResponse<T = unknown> =
  | {
      success: true;
      message: string;
      data: T;
    }
  | {
      success: false;
      message: string;
      fieldErrors?: Record<string, string[] | undefined>;
      error?: {
        code?: string;
        message?: string;
        details?: unknown;
      };
    };

export type AuthStatus =
  | { type: "idle" }
  | { type: "verify-email"; email: string }
  | { type: "field-error"; fieldErrors: Record<string, string[] | undefined> }
  | { type: "error"; message: string };

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
