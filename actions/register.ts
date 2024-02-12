"use server";

import { RegisterSchema } from "@/validation/register_validation";
import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "../config/db";
import { check_user_authorize_withEmail } from "../data/check_user";
import { generateToken_func } from "@/lib/generate_verification_token";
import { get_url } from "@/lib/get_url";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validationResult = RegisterSchema.safeParse(values);
    const baseUrl = get_url();

    if (!validationResult.success) {
        return { error: "Invalid Fields" };
    }

    let { username, email, password } = validationResult.data;
    let hashPassword = await bcrypt.hash(password, 10);

    const existingUser = await check_user_authorize_withEmail(email);

    if (existingUser) {
        return { error: "Email already in use!" };
    }

    await db.user.create({
        data: {
            name: username,
            email,
            password: hashPassword,
        },
    });

    const verificationToken = await generateToken_func(email);

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

    return { success: "Please verification your email" };
};
