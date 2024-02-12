import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";

import { LoginSchema } from "@/validation/login_validation";
import { check_user_authorize_withEmail } from "./data/check_user";

import bcrypt from "bcryptjs";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                const validationResult = LoginSchema.safeParse(credentials);
                if (validationResult.success) {
                    let { email, password } = validationResult.data;
                    const existingUser = await check_user_authorize_withEmail(
                        email
                    );

                    if (!existingUser) return null;

                    let isPassword = await bcrypt.compare(
                        password,
                        existingUser.password!
                    );
                    if (isPassword) return existingUser;
                }
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
