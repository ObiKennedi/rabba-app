"use server";
import * as z from "zod"
import { LoginSchem } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/utils/tokens";
import { sendVerification } from "@/utils/mail";
import { getUserByEmail } from "@/data/user";

export const login = async (
  values: z.infer<typeof LoginSchem>
): Promise<{ error?: string; success?: string }> => {
  const validateFields = LoginSchem.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validateFields.data;

  const existingUser = await getUserByEmail(email)
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    )

    await sendVerification(
      verificationToken.email,
      verificationToken.token
    )

    return { success: "Confirmation email sent!!" }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    // ✅ Success response added
    return { success: "Login successful" };

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error; // for unexpected errors
  }
};

