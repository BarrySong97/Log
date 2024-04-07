"use client";
import React, { FC } from "react";
import { Button, Input } from "@nextui-org/react";
import { Form } from "antd";
export interface LoginFormProps {}
const LoginForm: FC<LoginFormProps> = () => {
  return (
    <Form className="w-full">
      <Form.Item name={"username"} noStyle>
        <Input
          variant="underlined"
          placeholder="输入你的邮箱"
          label="邮箱"
          className="mb-4"
        />
      </Form.Item>
      <Form.Item name={"password"} noStyle>
        <Input
          variant="underlined"
          placeholder="输入你的密码"
          label="密码"
          className="mb-4"
          type="password"
        />
      </Form.Item>
      <Form.Item noStyle>
        <Button color="primary" className="w-full">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
