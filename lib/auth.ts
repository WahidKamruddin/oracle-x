import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";


type CurrentUser = {
  userId: string;
} | null;

export async function getCurrentUser(): Promise<CurrentUser>{
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;

  const session = await decrypt(cookie);
  if (!session?.userId) return null;

  return {
    userId: session.userId,
  };
}

