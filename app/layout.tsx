import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import getUserInfo, { getCurrentUser } from "@/lib/auth";
import { AuthProvider } from "@/components/providers/authProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oracle X",
  description: "Cryptocoin Tracker",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getCurrentUser();
  const userInfo = await getUserInfo();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider user={user} userInfo={userInfo}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
