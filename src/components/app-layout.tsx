"use client";
import { usePathname } from "next/navigation";
import React, { FC, useEffect } from "react";
export type AppLayoutProps = Readonly<{
  children: React.ReactNode;
}>;
const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  return (
    <main
      id="page-container"
      className={`flex p-0 pt-0 lg:p-24 min-h-screen flex-col items-center ${
        pathname !== "/" ? "lg:pt-0" : "justify-between"
      } `}
    >
      {children}
    </main>
  );
};

export default AppLayout;
