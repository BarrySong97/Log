import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Link } from "@nextui-org/react";
import LayoutHeader from "./components/layout-header";
import { usePathname } from "next/navigation";
import AppLayout from "./components/app-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barry's Blog",
  description: "Share everything I care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} scrollbar`}>
        <Providers>
          <AppLayout>
            <LayoutHeader />
            {children}
          </AppLayout>
        </Providers>
      </body>
    </html>
  );
}
