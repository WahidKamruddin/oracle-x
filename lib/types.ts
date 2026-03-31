import type { UserModel } from "@/lib/generated/prisma/models";

export type FormState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
} | null | undefined;

export type AuthUser = Pick<UserModel, "id" | "name" | "email"> | null;
