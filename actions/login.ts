"use server";

import { LoginSchema } from "@/validation/login_validation";
import * as z from "zod";
import bcrypt from "bcrypt";
import { check_user_authorize_withEmail } from "../data/check_user";

import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { AuthError } from "next-auth";
import { signIn } from "../auth";
import { generateToken_func } from "@/lib/generate_verification_token";
import { get_url } from "@/lib/get_url";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validationResult = LoginSchema.safeParse(values);
    const baseUrl = get_url();

    if (!validationResult.success) {
        return { error: "Invalid Fields" };
    }

    let { email, password } = validationResult.data;

    const existingUser = await check_user_authorize_withEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email doesn't not exit" };
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateToken_func(existingUser.email);
        await fetch(`${baseUrl}/api/send`, {
            method: "POST",
            body: JSON.stringify({
                email,
                verificationToken,
            }),
        })
            .then((result) => {
                console.log(result);
            })
            .catch((err) => console.log("Error", err));
        return { success: "Please verified your email" };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: "This user doesn't match our credentials!",
                    };
                default:
                    return {
                        error: "Something went wrong!",
                    };
            }
        }
        throw error;
    }
};
