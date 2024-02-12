import { headers } from "next/headers";

export const get_url = () => {
    const hostName = headers().get("host"),
        protocol = headers().get("x-forwarded-proto");
    const baseUrl = `${protocol}://${hostName}`;

    return baseUrl;
};
