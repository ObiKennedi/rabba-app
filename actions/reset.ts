"use server"

import * as z from "zod"

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"

export const resetPassword = async (values: z.infer<typeof ResetSchema>) =>{
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Not a valid email"}
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {error: "Email not found !!"}
    }

    return {success: "Reset email sent"}
        
}

