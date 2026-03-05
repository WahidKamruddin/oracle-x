import { Navbar } from "@/components/navbar";
import type { ReactNode } from "react";

export default function RoutesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full">
        <Navbar className="w-full pl-12 fixed top-0 bg-white z-50"/>
        <main className="mt-16">
          {children}
        </main>
    </div>
  )
}