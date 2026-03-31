import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import prisma from "./prisma";
import type { AuthUser } from "@/lib/types";

export async function getUser(): Promise<AuthUser> {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;

  const session = await decrypt(cookie);
  if (!session?.userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true },
  });

  return user;
}
