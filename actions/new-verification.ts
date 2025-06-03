"use server";

import { db } from "@/utils/db";
import { getVerificationTokenByToken } from "@/data/verify-token";
import { getUserByEmail } from "@/data/user";

export const NewVerification = async (token: string) =>{
    const existingToken = await getVerificationTokenByToken(token);

    if(!existingToken){
        return {error: "Could not find token !!!"}
    };

    const expiredToken = new Date(existingToken.expires) < new Date();

    if (expiredToken){
        return{error: "Token has expired return to sign in"}
    };

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser){
        return {error: "User does not exist"}
    };

    await db.user.update({
        where:  {id: existingUser.id},      
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    });

    await db.verificationToken.delete({
        where: {id: existingToken.id}
    });

    return {success: "Email verified"}
};