//public routes
export const privateRoutes = ["/home", "/profile"];

//authentication route
export const authenticationCredentialRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
];

//prefix route
export const authenticationProviderRoutes = "/api/auth";

//If user is logged in , redirect to home page
export const DEFAULT_LOGIN_REDIRECT = "/home";
