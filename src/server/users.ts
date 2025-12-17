"use server";

import { auth } from "@/lib/auth/auth";
import { registerSchema } from "@/lib/validations";
import { ActionResponse } from "@/types/actions";
import z from "zod";

export const registerUser = async (
  data: z.infer<typeof registerSchema>
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
