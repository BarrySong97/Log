import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "../styles/shiki.css";
import { Providers } from "../providers";
import LayoutHeader from "../../components/layout-header";
import AppLayout from "../../components/app-layout";
import BackToTopBottom from "../../components/back-to-top-bottom";
import { seo } from "../seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barry Song's 小宇宙",
  description: "属于我的小宇宙",
  openGraph: {
    title: {
      default: "Barry Song's Blog",
      template: "%s | Barry Song的小宇宙",
    },
    description: "探索宇宙，永葆青春",
    siteName: "Barry Song's Blog",
    locale: "zh_CN",
    type: "website",
    url: "https://www.barrysong4real.cc/",
  },
  twitter: {
    ...seo.twitter,
  },
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
