import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "../styles/shiki.css";
import { Providers } from "../providers";
import LayoutHeader from "../../components/layout-header";
import AppLayout from "../../components/app-layout";
import BackToTopBottom from "../../components/back-to-top-bottom";

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
      <body className={`${inter.className} scrollbar `}>
        <BackToTopBottom />
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
