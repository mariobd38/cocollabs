import { z } from "zod";

export const signupSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required." })
        .email({ message: "Email is invalid or already in use."}),
    password: z.string()
        .min(1, { message: "Password is required." })
        .min(8, { message: "Password must be at least 8 characters."})
        .max(128, { message: "Password is too long (maximum 128 characters)." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one number." })
        .regex(/[\W_]/, { message: "Password must contain at least one special character." })
});