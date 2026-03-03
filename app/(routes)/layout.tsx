import Nav from "@/components/nav";
import type { ReactNode } from "react";

export default function RoutesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
        <Nav/>
        {children}
    </div>
  )
}