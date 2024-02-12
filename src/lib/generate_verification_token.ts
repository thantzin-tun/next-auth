import { nanoid } from "nanoid";
import { db } from "../../config/db";
import { verification_with_email } from "../../data/verification";

//if existing token delete and generate token
export const generateToken_func = async (email: string) => {
    const token = nanoid();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingVerificationToken = await verification_with_email(email);

    if (existingVerificationToken) {
        await db.verification.delete({
            where: {
                id: existingVerificationToken.id,
            },
        });
    }

    const verificationToken = await db.verification.create({
        data: {
            email,
            token,
            expires,
        },
    });

    

    return verificationToken;
};
