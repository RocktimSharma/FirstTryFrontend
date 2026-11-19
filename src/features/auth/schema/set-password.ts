import { z } from "zod";

export const setPasswordSchema = z
    .object({
        password: z
            .string()
            .min(1, "Password is required.")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/,
                "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character."
            ),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match.",
    });