"use server"

import * as z from "zod"
import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/schemas"
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/utils/db";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {
    if (!token){
        return {error: "Could not find token"}
    };

    const validatedFields = NewPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: "Could not validate fields"}
    };

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
        return {error: "No valid token found"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date;

    if (hasExpired) {
        return {error: "Token has expired"}
    };

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return {error: "Email not found"}
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {id: existingUser.id},
        data: {password: hashedPassword}
    });

    await db.resetPasswordToken.delete({
        where: {id: existingToken.id}
    })

    return {success: "Password updated!!, return to sign in"}
};