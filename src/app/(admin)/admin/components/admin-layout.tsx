"use client";
import { User } from "@nextui-org/react";
import "./index.css";
import React, { FC } from "react";
import { cn } from "@nextui-org/react";
import type { User as UserType } from "@/app/api/model";
import {
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
import { signOut } from "@/auth";
import { signOutAction } from "../action";
import { useQuery } from "react-query";
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
      onClick: () => {
        signOut();
      },
    },
  ];
  // relace所有url query
  const pathname = usePathname();

  const router = useRouter();
  const { data } = useQuery<UserType>("user", {
    queryFn: async () => {
      const res = await fetch("/api/setting").then((res) => res.json());
      return res.data;
    },
  });
  return (
    <main className="flex h-dvh w-full">
      <div className="relative flex h-full  justify-between max-w-[288px] flex-1 flex-col !border-r-small border-divider p-6 transition-[transform,opacity,margin] duration-250 ease-in-out">
        <div>
          <div className="px-2">
            <User
              name={data?.name}
              description="Blog Host"
              className="justify-start"
              avatarProps={{
                src: data?.avatar,
                size: "sm",
                name: data?.name?.[0].toUpperCase(),
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
          <form
            className="flex cursor-pointer hover:bg-default-100/80 h-10 px-1 rounded-md items-center gap-[10px]"
            action={signOutAction}
          >
            <SolarLogout2Broken className="text-xl " />
            <button className="ant-menu-title-content">登出</button>
          </form>
          {/* <Menu mode="inline" items={bottomMenu} /> */}
        </div>
      </div>
      <div className="flex-1 p-4">{children}</div>
    </main>
  );
};

export default AdminLayout;
