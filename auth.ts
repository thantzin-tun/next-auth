import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./config/db";
import { check_user_authorize_withID } from "./data/check_user";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    events: {
        async linkAccount({ user }) {
            //check multiple providers
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    callbacks: {
        async signIn({ user, account }: any) {
            console.log("Account Provider", account?.provider);
            //Allow user signIn provider
            if (account?.provider !== "credential") return true;
            let existingUser = await check_user_authorize_withID(user.id);

            if (!existingUser?.emailVerified) return false;

            return true;
        },
        async session({ token, session }: any) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.role = token.role;
            }
            console.log("Session", session);
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await check_user_authorize_withID(token.sub);

            if (!existingUser) return token;
            token.role = existingUser.role;
            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
