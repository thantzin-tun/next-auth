import * as z from "zod";

export const LoginSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .endsWith(".com", { message: "Only .com domains allowed" }),
    password: z.string().min(1, {
        message: "Password is required.",
    }),
});
