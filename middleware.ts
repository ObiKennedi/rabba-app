import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
    publicRoutes,
    DEFAULT_LOGIN_REDIRECT,
    authRoutes,
    apiRoutePrefix,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiRoute = nextUrl.pathname.startsWith(apiRoutePrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiRoute) {
        return
    };

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        };

        return;
    };

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/sign-in", nextUrl))
    }

    return;
});

export const config = {
    matcher: ["/((?!.*\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
