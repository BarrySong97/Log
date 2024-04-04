"use client";
import { Listbox, ListboxItem, User } from "@nextui-org/react";
import React, { FC } from "react";
import { cn } from "@nextui-org/react";
import {
  SolarBook2Broken,
  SolarHomeAngle2Linear,
  SolarLogout2Broken,
  SolarMonitorSmartphoneOutline,
  SolarSettingsBroken,
} from "@/assets/icon";
import { usePathname } from "next/navigation";

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
      icon: <SolarHomeAngle2Linear />,
      href: "/admin/dashboard",
      showCount: false,
    },
    {
      label: "文章",
      icon: <SolarBook2Broken />,
      href: "/admin/posts",
      showCount: true,
    },
    {
      label: "项目",
      icon: <SolarMonitorSmartphoneOutline />,
      href: "/admin/projects",
      showCount: true,
    },
    {
      label: "设置",
      icon: <SolarSettingsBroken />,
      href: "/admin/setting",
      showCount: false,
    },
  ];
  const bottomMenu = [
    {
      label: "注销",
      icon: <SolarLogout2Broken />,
    },
  ];
  const pathname = usePathname();

  const selectKeys = new Set([pathname]);
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
          <div>
            <Listbox
              aria-label="User Menu"
              selectedKeys={selectKeys}
              selectionMode="single"
              disallowEmptySelection
              shouldHighlightOnFocus
              shouldFocusWrap
              hideSelectedIcon
              className="p-0 mt-4 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible  rounded-medium"
              itemClasses={{
                base: "px-2 py-1.5   gap-1 h-12 aria-[selected=true]:bg-default-100/80 data-[hover=true]:bg-default-100/80 aria-[selected=true]:text-default-foreground  data-[hover=true]:text-default-foreground data-[selectable=true]:focus:bg-default/40 data-[selectable=true]:focus:text-default-foreground min-h-11",
              }}
            >
              {menuItem.map((menu) => {
                return (
                  <ListboxItem
                    key={menu.href}
                    as={"a"}
                    href={menu.href}
                    className="font-medium text-default-500"
                    endContent={
                      menu.showCount ? (
                        <div className="flex items-center gap-1 text-default-400 font-normal">
                          <span className="text-small">{4}</span>
                        </div>
                      ) : null
                    }
                    startContent={
                      <IconWrapper className="text-2xl">
                        {menu.icon}
                      </IconWrapper>
                    }
                  >
                    {menu.label}
                  </ListboxItem>
                );
              })}
            </Listbox>
          </div>
        </div>
        <div>
          <Listbox
            aria-label="User Menu"
            selectedKeys={selectKeys}
            selectionMode="single"
            disallowEmptySelection
            shouldHighlightOnFocus
            shouldFocusWrap
            hideSelectedIcon
            className="p-0 mt-4 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible  rounded-medium"
            itemClasses={{
              base: "px-2 py-1.5   gap-1 h-12 aria-[selected=true]:bg-default-100/80 data-[hover=true]:bg-default-100/80 aria-[selected=true]:text-default-foreground  data-[hover=true]:text-default-foreground data-[selectable=true]:focus:bg-default/40 data-[selectable=true]:focus:text-default-foreground min-h-11",
            }}
          >
            {bottomMenu.map((menu) => {
              return (
                <ListboxItem
                  key={menu.label}
                  className="font-medium text-default-500"
                  startContent={
                    <IconWrapper className="text-2xl">{menu.icon}</IconWrapper>
                  }
                >
                  {menu.label}
                </ListboxItem>
              );
            })}
          </Listbox>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </main>
  );
};

export default AdminLayout;
