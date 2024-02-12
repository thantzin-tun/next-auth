import { db } from "../config/db";

export const check_user_authorize_withEmail = async (email: string) => {
    try {
        let hasUser = await db.user.findUnique({
            where: {
                email,
            },
        });
        return hasUser;
    } catch (error) {
        return null;
    }
};

export const check_user_authorize_withID = async (id: string) => {
    try {
        let hasUser = await db.user.findUnique({
            where: {
                id,
            },
        });
        return hasUser;
    } catch (error) {
        return null;
    }
};
