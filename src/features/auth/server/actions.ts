"use server";

import { auth } from "@/lib/auth/auth";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validation";
import z from "zod";
import { ActionResponse } from "../types";

export const registerUser = async (
  data: z.infer<typeof registerSchema>,
): Promise<
  ActionResponse<{ user: { email: string; emailVerified: boolean } }>
> => {
  const validated = registerSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      message: "Check the form for errors",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    return {
      success: true,
      message: "Account created successfully",
      data: res,
    };
  } catch (err: any) {
    const errorMessage = err?.body?.message ?? "Failed to create Account";

    return {
      success: false,
      message: errorMessage,
      error: {
        message: errorMessage,
      },
    };
  }
};

export const verifyEmail = async (email: string): Promise<ActionResponse> => {
  if (!email) {
    return {
      success: false,
      message: "No email provided",
    };
  }

  try {
    await auth.api.sendVerificationEmail({
      body: {
        email,
        callbackURL: process.env.LOGIN_SUCCESS_CALLBACK_URL ?? "/dashboard",
      },
    });

    return {
      success: true,
      message: "Verify email sent successfully",
      data: "",
    };
  } catch (err: any) {
    const errorMessage =
      err?.body?.message ?? "Failed to send verification email";

    return {
      success: false,
      message: errorMessage,
      error: {
        message: errorMessage,
      },
    };
  }
};

export const loginUser = async (
  data: z.infer<typeof loginSchema>,
): Promise<ActionResponse> => {
  const validated = loginSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      message: "Check the form for errors",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });

    return {
      success: true,
      message: "Login successful",
      data: res,
    };
  } catch (err: any) {
    console.log(err, err.body);
    const errorMessage = err?.body?.message ?? "Failed to Login";

    return {
      success: false,
      message: errorMessage,
      error: {
        code: err.body.code,
        message: errorMessage,
      },
    };
  }
};

export const forgotPassword = async (
  email: string,
): Promise<ActionResponse> => {
  const validated = forgotPasswordSchema.safeParse({ email });

  if (!validated.success) {
    return {
      success: false,
      message: "Check the form for errors",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: "/reset-password",
      },
    });

    return {
      success: true,
      message:
        "If an account exists for this email, a password reset link has been sent.",
      data: "",
    };
  } catch (err: any) {
    const errorMessage =
      err?.body?.message ?? "Unable to process password reset request";

    return {
      success: false,
      message: errorMessage,
      error: { message: errorMessage },
    };
  }
};

export const resetPassword = async (data: {
  password: string;
  confirmPassword: string;
  token: string;
}): Promise<ActionResponse> => {
  const validated = resetPasswordSchema.safeParse({
    password: data.password,
    confirmPassword: data.confirmPassword,
  });

  if (!validated.success) {
    return {
      success: false,
      message: "Check the form for errors",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }
  try {
    await auth.api.resetPassword({
      body: {
        newPassword: data.password,
        token: data.token,
      },
    });

    return {
      success: true,
      message: "Password reset successfully",
      data: "",
    };
  } catch (err: any) {
    const errorMessage = err?.body?.message ?? "Failed to reset the password";

    return {
      success: false,
      message: errorMessage,
      error: {
        code: err.body.code,
        message: errorMessage,
      },
    };
  }
};
