import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters"),

    password: z.string(),

    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    const { password, confirmPassword } = data;

    // ---- Required checks (NO returns) ----
    if (!password) {
      ctx.addIssue({
        path: ["password"],
        message: "Password is required",
        code: "custom",
      });
    }

    if (!confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Confirm password is required",
        code: "custom",
      });
    }

    // Stop further checks if password missing
    if (!password) return;

    // ---- Password rules ----
    if (password.length < 8) {
      ctx.addIssue({
        path: ["password"],
        message: "Password must be at least 8 characters long",
        code: "custom",
      });
      return;
    }

    if (!/[A-Z]/.test(password)) {
      ctx.addIssue({
        path: ["password"],
        message: "Must contain at least one uppercase letter",
        code: "custom",
      });
      return;
    }

    if (!/[a-z]/.test(password)) {
      ctx.addIssue({
        path: ["password"],
        message: "Must contain at least one lowercase letter",
        code: "custom",
      });
      return;
    }

    if (!/[0-9]/.test(password)) {
      ctx.addIssue({
        path: ["password"],
        message: "Must contain at least one number",
        code: "custom",
      });
      return;
    }

    if (!/[\W_]/.test(password)) {
      ctx.addIssue({
        path: ["password"],
        message: "Must contain at least one special character",
        code: "custom",
      });
      return;
    }

    // ---- Match check (only if both exist) ----
    if (confirmPassword && password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords don't match",
        code: "custom",
      });
    }
  });

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = registerSchema.pick({ email: true });

export const resetPasswordSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    const { password, confirmPassword } = data;

    // ---- Required checks (NO returns) ----
    if (!password) {
      ctx.addIssue({
        path: ["password"],
        message: "Password is required",
        code: "custom",
      });
    }

    if (!confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Confirm password is required",
        code: "custom",
      });
    }

    // Stop further checks if password missing
    if (!password) return;

    // ---- Password rules ----
    if (password.length < 8) {
      ctx.addIssue({
        path: ["password"],
        message: "Password must be at least 8 characters long",
        code: "custom",
      });
      return;
    }

    if (!/[A-Z]/.test(password)) {
      ctx.addIssue({
        path: ["password"],
        message: "Must contain at least one uppercase letter",
        code: "custom",
      });
      return;
    }

    if (!/[a-z]/.test(password)) {
      ctx.addIssue({
        path: ["password"],
        message: "Must contain at least one lowercase letter",
        code: "custom",
      });
      return;
    }

    if (!/[0-9]/.test(password)) {
      ctx.addIssue({
        path: ["password"],
        message: "Must contain at least one number",
        code: "custom",
      });
      return;
    }

    if (!/[\W_]/.test(password)) {
      ctx.addIssue({
        path: ["password"],
        message: "Must contain at least one special character",
        code: "custom",
      });
      return;
    }

    // ---- Match check (only if both exist) ----
    if (confirmPassword && password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords don't match",
        code: "custom",
      });
    }
  });
