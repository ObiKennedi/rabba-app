"use server";
import * as z from "zod"
import { RegisterSchema } from "@/schemas";
import { db } from "@/utils/db";
import bcrypt from "bcryptjs"
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/utils/tokens";
import { sendVerification } from "@/utils/mail";

export const registerAction = async (values: z.infer<typeof RegisterSchema>) => {
  //console.log(values);
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return {error: "Invalid fields"}
  };

  const {email, password, name} = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser){
    return {error: "Email already in use"}
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    }
  })

  const verificationToken = await generateVerificationToken(email)
  await sendVerification(
    verificationToken.email,
    verificationToken.token
  )

  return {success: "Verification email sent!!"}; 
};
