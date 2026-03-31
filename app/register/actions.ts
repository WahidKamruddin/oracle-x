"use server";

import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcryptjs";
import type { FormState } from "@/lib/types";


const registerSchema = z.object({
  name: z.string().trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function register(prevState: FormState, formData: FormData) {
  const result = registerSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, email: rawEmail, password } = result.data;
  const email = rawEmail.toLowerCase();

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return {
      errors: {
        email: ["Email already exists."],
      },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  await createSession(user.id);

  redirect("/");
}
