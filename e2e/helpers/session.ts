import { SignJWT } from "jose";
import type { BrowserContext } from "@playwright/test";

const SESSION_SECRET = process.env.SESSION_SECRET!;
if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET is not set — ensure .env.test is loaded");
}
const encodedKey = new TextEncoder().encode(SESSION_SECRET);

export async function createSessionToken(userId: string): Promise<string> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  return new SignJWT({ userId, expiresAt })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function injectAuthCookie(
  context: BrowserContext,
  userId: string
): Promise<void> {
  const token = await createSessionToken(userId);
  await context.addCookies([
    {
      name: "session",
      value: token,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      secure: false, // must be false for HTTP on localhost
      sameSite: "Lax",
    },
  ]);
}
