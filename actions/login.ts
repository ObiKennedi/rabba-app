"use server"

import * as z from "zod"
import { LoginSchema } from "@/schema"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { generateVerificationToken } from "@/lib/tokens"
import { getUserByEmail } from "@/data/user"
import { sendVerificationEmail } from "@/lib/mail"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "No account found with this email." };
  }

  if (!existingUser.password) {
    return { error: "This password is wrong"}
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return { success: "A confirmation email has been sent to verify your account." };
  }


  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Logged in successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        default:
          return { error: "Something went wrong during sign in." };
      }
    }
    throw error;
  }
};
