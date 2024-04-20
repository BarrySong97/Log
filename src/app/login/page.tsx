import React, { FC } from "react";
import LoginForm from "./components/login-form";
import { Metadata } from "next";
export interface LoginProps {}
export const metadata: Metadata = {
  title: "登录 - Barry Song's 小宇宙",
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
const Login: FC<LoginProps> = () => {
  return (
    <div className="relative flex h-screen w-screen">
      <div className="absolute left-2 top-5 lg:left-5 text-2xl font-semibold underline underline-offset-4">
        BarrySong
      </div>
      <div className="flex w-full items-center justify-center bg-background lg:w-1/2">
        <div className="flex w-full max-w-sm flex-col items-center gap-4 p-4">
          <LoginForm />
        </div>
      </div>
      <div
        style={{
          backgroundImage:
            "url(https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/white-building.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative hidden w-1/2 flex-col-reverse rounded-medium p-10 shadow-small lg:flex"
      ></div>
    </div>
  );
};

export default Login;
