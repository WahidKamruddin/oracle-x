"use server";

import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";


const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function register(prevState: any, formData: FormData) {
    const result = loginSchema.safeParse(Object.fromEntries(formData));
      
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    const { email, password } = result.data;

    const userExists = await prisma.user.findUnique({
      where: {email: email},
    });

    if (userExists) {
      return {
        errors: {
          email: ["Email already exists."],
        },
      };
    };
  

    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
      }
    });

    await createSession(user.id.toString());

    redirect("/");
}