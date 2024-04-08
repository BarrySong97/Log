import React, { FC } from "react";
import { Button, Input } from "@nextui-org/react";
import { Form } from "antd";
// import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "@/auth";
import { signInAction } from "./actions";
export interface LoginFormProps {}
const LoginForm: FC<LoginFormProps> = () => {
  return (
    <form className="w-full" action={signInAction}>
      <Input
        variant="underlined"
        name="username"
        placeholder="输入你的邮箱"
        label="邮箱"
        className="mb-4"
      />
      <Input
        variant="underlined"
        placeholder="输入你的密码"
        name="password"
        label="密码"
        className="mb-4"
        type="password"
      />
      <Button type="submit" color="primary" className="w-full">
        登录
      </Button>
    </form>
  );
};

export default LoginForm;
