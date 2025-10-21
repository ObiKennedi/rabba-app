import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Insert a valid email"
    }), 
    password: z.string().min(1, {
        message: "Please insert your password"
    })
})