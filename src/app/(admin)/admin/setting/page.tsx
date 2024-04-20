import { Input, User } from "@nextui-org/react";
import { Form } from "antd";
import React, { FC } from "react";
import SocialMediaForm from "./components/social-media-form";
import AvatarUpload from "../components/avatar-uploader";
import SettingAvatar from "./components/avatar";
import { Metadata } from "next";
export interface SettingProps {}
export const metadata: Metadata = {
  title: "设置 - Barry Song's 小宇宙",
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
};
const Setting: FC<SettingProps> = () => {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold leading-9 text-default-foreground mb-8">
        设置
      </h1>
      <div>
        <div className="mb-4">
          <p className="text-base font-medium text-default-700">个人资料</p>
          <p className="mt-1 text-sm font-normal text-default-400">
            修改个人, 社交媒体信息
          </p>
          <div className="flex flex-col relative overflow-hidden height-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-none rounded-large transition-transform-background motion-reduce:transition-none mt-4 bg-default-100">
            <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
              <SettingAvatar />
            </div>
          </div>
        </div>
        <div>
          <p className="text-base font-medium text-default-700">社交媒体</p>
          <p className="mt-1 text-sm font-normal text-default-400 mb-4">
            社交媒体链接
          </p>
          <SocialMediaForm />
        </div>
      </div>
    </div>
  );
};

export default Setting;
