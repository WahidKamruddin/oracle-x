"use client";

import { createContext, useContext } from "react";
import type { AuthUser } from "@/lib/types";

const AuthContext = createContext<{
  user: AuthUser;
  isAuthenticated: boolean;
} | null>(null);

interface AuthProviderProps {
  user: AuthUser;
  children: React.ReactNode;
}

export function AuthProvider({ user, children }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
