"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext<{
  user: { userId: string } | null;
  isAuthenticated: boolean;
} | null>(null);


//fix this type
interface AuthProviderProps {
  user: any | null;
  children: React.ReactNode;
}

export function AuthProvider({ user, children }: AuthProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
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