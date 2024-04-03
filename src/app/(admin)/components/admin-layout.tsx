import { User } from "@nextui-org/react";
import React, { FC } from "react";
export interface AdminLayoutProps {
  children?: React.ReactNode;
}
const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  return (
    <main className="flex h-dvh w-full">
      <div className="relative flex h-full  max-w-[288px] flex-1 flex-col !border-r-small border-divider p-6 transition-[transform,opacity,margin] duration-250 ease-in-out">
        <User
          name="Jane Doe"
          description="Product Designer"
          className="justify-start"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
        />
      </div>
      <div className="flex-1">{children}</div>
    </main>
  );
};

export default AdminLayout;
