import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import prisma from "./prisma";

// make this into one single function and return both the userID and userInfo 
// take out isAuthenticated - if user exists then obvi authenticated

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

type UserInfo = {
  name: string,
  email: string
} | null

export async function getUserInfo(): Promise<UserInfo>{

    const user = await getCurrentUser();
    if (!user) return null;

    const userInfo = await prisma.user.findUnique({
    where: {
        id: user.userId,
    },
    select: {
        name: true,
        email: true
    }
    });


    return userInfo;
}
 
export default getUserInfo;


