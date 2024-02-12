import authConfig from "../auth.config";
import NextAuth from "next-auth";
import {
    authenticationCredentialRoutes,
    privateRoutes,
    authenticationProviderRoutes,
    DEFAULT_LOGIN_REDIRECT,
} from "../routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { pathname } = req.nextUrl;

    const isLogged = !!req.auth;

    const authentication_provider_routes = pathname.startsWith(
        authenticationProviderRoutes
    ); //api/auth/....
    //Keep Going
    if (authentication_provider_routes) {
        return null;
    }

    const authentication_credential_routes =
        authenticationCredentialRoutes.includes(pathname); //check if  user already login or register
    if (authentication_credential_routes) {
        if (isLogged) {
            return Response.redirect(
                new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl)
            );
        }
        return null;
    }

    const private_routes = privateRoutes.includes(pathname);

    if (!isLogged && private_routes) {
        return Response.redirect(new URL("auth/login", req.nextUrl));
    }
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
