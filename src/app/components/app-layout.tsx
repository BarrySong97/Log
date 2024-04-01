"use client";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
export type AppLayoutProps = Readonly<{
  children: React.ReactNode;
}>;
const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  return (
    <main
      className={`flex    min-h-screen flex-col items-center ${
        pathname !== "/" ? "" : "justify-between"
      } p-24`}
    >
      {children}
    </main>
  );
};

export default AppLayout;
