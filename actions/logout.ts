"use server";

import { signOut } from "../auth";

export const logout = async () => {
    let logout = await signOut();
};
