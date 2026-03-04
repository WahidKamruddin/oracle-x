import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";


export async function getCurrentUser() {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;

  const session = await decrypt(cookie);
  if (!session?.userId) return null;

  return {
    userId: session.userId,
  };
}

