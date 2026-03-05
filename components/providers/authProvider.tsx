"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext<{
  user: { userId: string } | null;
  isAuthenticated: boolean;
  userInfo: {
    name: string,
    email: string
  }
} | null>(null);


//fix this type
interface AuthProviderProps {
  user: any | null;
  userInfo: any | null,
  children: React.ReactNode;
}

export function AuthProvider({ user, userInfo, children }: AuthProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        userInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  let ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}