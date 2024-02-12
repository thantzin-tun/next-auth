import NextAuth, { type DefaultSession } from "next-auth";
import { type } from "os";

export type ExtendedUser = DefaultSession["user"] & {
    role: "ADMIN" | "USER";
};

declare module "next-auth" {
    interface Session {
        user: {
            role: string;
        } & DefaultSession["user"];
    }
}

import { JWT } from "next-auth/jwt";

declare module "next-aut/jwt" {
    interface JWT {
        role?: "ADMIN" | "USER";
    }
}
