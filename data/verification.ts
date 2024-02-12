import { db } from "../config/db";

export const verification_with_token = async (token: string) => {
    try {
        let verificationToken = await db.verification.findUnique({
            where: {
                token,
            },
        });
        return verificationToken;
    } catch (error) {}
};

export const verification_with_email = async (email: string) => {
    try {
        let verificationEmail = await db.verification.findFirst({
            where: {
                email,
            },
        });
        return verificationEmail;
    } catch (error) {}
};
