import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./utils/db";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/sign-in",
        error: "/error-page"
    },
    events: {
        async linkAccount({ user }){
            await db.user.update({
                where: {id: user.id},
                data: {emailVerified: new Date()}
            })
        }
    },

    callbacks: {
        async signIn({user, account}){

            if (account?.provider == "credentials") return true
            
            const existingUser = await getUserById(user.id!);

            if (!existingUser?.emailVerified) return false;

            return true
        },

        async session({token, session}){
            if (token.sub && session.user){
                session.user.id = token.sub
            }
            
            return session
        },
        async jwt({token}){
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            return token 
        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig
})