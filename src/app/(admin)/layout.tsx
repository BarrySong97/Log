import { Providers } from "@/app/providers";
import AdminLayout from "./admin/components/admin-layout";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@/app/globals.css";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AdminLayout>
            <AntdRegistry>{children}</AntdRegistry>
          </AdminLayout>
        </Providers>
      </body>
    </html>
  );
}
