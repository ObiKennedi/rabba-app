import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs"

import type { NextAuthConfig } from "next-auth";

import { LoginSchem } from "./schemas";
import { getUserByEmail } from "./data/user";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            async authorize(credentials){
                const validateFields = LoginSchem.safeParse(credentials);

                if (validateFields.success) {
                    const { email, password } = validateFields.data;

                    const user = await getUserByEmail(email)
                    if (!user || !user.password) return null;

                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password,
                    )

                    if (passwordMatch) {
                        return user
                    }
                }

                return null;
            }
        })
    ],
}satisfies NextAuthConfig