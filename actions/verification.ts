"use server";
import { db } from "../config/db";
import { check_user_authorize_withEmail } from "../data/check_user";
import { verification_with_token } from "../data/verification";

export const verification = async (token: string) => {
    const existingToken = await verification_with_token(token);

    if (!existingToken) return { error: "Token doesn't exist" };

    let isExpired = new Date(existingToken.expires) < new Date();

    if (isExpired) return { error: "Token has expired" };

    //Check user collections
    let existingUser = await check_user_authorize_withEmail(
        existingToken.email
    );

    if (!existingUser) return { error: "This user is doesn't our credentials" };

    await db.user.update({
        where: {
            email: existingToken.email,
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        },
    });

    await db.verification.delete({
        where: { id: existingToken.id },
    });

    return { success: "Email Verified!" };
};

// 4: 42
