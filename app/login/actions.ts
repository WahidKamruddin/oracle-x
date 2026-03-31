"use server";

import prisma from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcryptjs";
import type { FormState } from "@/lib/types";


const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});


export async function login(prevState: FormState, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email: rawEmail, password } = result.data;
  const email = rawEmail.toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  const passwordMatch = user ? await bcrypt.compare(password, user.password) : false;

  if (!user || !passwordMatch) {
    return {
      errors: {
        password: ["Invalid email or password"],
      },
    };
  }

  await createSession(user.id);

  redirect("/");
}

export async function logout() {
  try {
    await deleteSession();
  } catch {
    throw new Error("Logout failed");
  }
}
