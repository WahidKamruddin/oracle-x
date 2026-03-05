"use server";

import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";


const registerSchema = z.object({
  name: z.string().trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function register(prevState: any, formData: FormData) {
    const result = registerSchema.safeParse(Object.fromEntries(formData));
      
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    const { name, email, password } = result.data;

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
        name: name,
        email: email,
        password: password,
      }
    });

    await createSession(user.id);

    redirect("/");
}