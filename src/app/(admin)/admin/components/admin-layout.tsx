"use client";
import { Listbox, ListboxItem, User } from "@nextui-org/react";
import "./index.css";
import React, { FC, useState } from "react";
import { cn } from "@nextui-org/react";
import {
  SolarAddSquareBold,
  SolarAddSquareLinear,
  SolarBook2Broken,
  SolarHamburgerMenuLineDuotone,
  SolarHashtagBold,
  SolarHomeAngle2Linear,
  SolarLogout2Broken,
  SolarMonitorSmartphoneOutline,
  SolarSettingsBroken,
} from "@/assets/icon";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "antd";

export const IconWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      className,
      "flex items-center rounded-small justify-center w-7 h-7"
    )}
  >
    {children}
  </div>
);
export interface AdminLayoutProps {
  children?: React.ReactNode;
}
const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const menuItem = [
    {
      label: "仪表盘",
      key: "/admin/dashboard",
      icon: <SolarHomeAngle2Linear />,
      href: "/admin/dashboard",
    },
    {
      label: "文章",
      key: "2",
      icon: <SolarBook2Broken />,
      children: [
        {
          label: "文章列表",
          key: "/admin/posts",
          href: "/admin/posts",
          icon: <SolarHamburgerMenuLineDuotone />,
        },
        {
          label: "新文章",
          key: "/admin/posts/new",
          icon: <SolarAddSquareLinear />,
          href: "/admin/posts/new",
        },
        {
          label: "Tag管理",
          href: "/admin/posts/tags",
          icon: <SolarHashtagBold />,
          key: "/admin/posts/tags",
        },
      ],
    },
    {
      label: "项目",
      key: "/admin/projects",
      icon: <SolarMonitorSmartphoneOutline />,
      href: "/admin/projects",
      showCount: true,
    },
    {
      label: "设置",
      icon: <SolarSettingsBroken />,
      key: "/admin/setting",
      href: "/admin/setting",
      showCount: false,
    },
  ];
  const bottomMenu = [
    {
      label: "注销",
      key: "1",
      icon: <SolarLogout2Broken />,
    },
  ];
  // relace所有url query
  const pathname = usePathname();

  const router = useRouter();
  return (
    <main className="flex h-dvh w-full">
      <div className="relative flex h-full  justify-between max-w-[288px] flex-1 flex-col !border-r-small border-divider p-6 transition-[transform,opacity,margin] duration-250 ease-in-out">
        <div>
          <div className="px-2">
            <User
              name="BarrySong"
              description="Blog Host"
              className="justify-start"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                size: "sm",
                isBordered: true,
                className: "mr-1",
              }}
            />
          </div>
          <div className="mt-4">
            <Menu
              style={{ width: 256 }}
              mode="inline"
              selectedKeys={[pathname]}
              defaultOpenKeys={["2"]}
              onSelect={({ key }) => {
                if (key !== "2") {
                  router.push(key);
                }
              }}
              items={menuItem}
            />
          </div>
        </div>
        <div>
          <Menu mode="inline" items={bottomMenu} />
        </div>
      </div>
      <div className="flex-1 p-4">{children}</div>
    </main>
  );
};

export default AdminLayout;