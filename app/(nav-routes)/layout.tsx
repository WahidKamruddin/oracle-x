import { Navbar } from "@/components/navbar";
import type { ReactNode } from "react";

export default function RoutesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full">
        <Navbar className="w-full pl-12 absolute bg-white"/>
        {children}
    </div>
  )
}