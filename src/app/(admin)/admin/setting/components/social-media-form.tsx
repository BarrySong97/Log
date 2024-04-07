"use client";
import { Input } from "@nextui-org/react";
import { Form } from "antd";
import React, { FC } from "react";
export interface SocialMediaFormProps {}
const SocialMediaForm: FC<SocialMediaFormProps> = () => {
  return (
    <div>
      <Form>
        <Form.Item name="weibo" noStyle>
          <Input radius="sm" size="sm" className="mb-4" label="邮箱" />
        </Form.Item>
        <Form.Item name="twitter" noStyle>
          <Input radius="sm" size="sm" className="mb-4" label="Twitter" />
        </Form.Item>
        <Form.Item name="weibo" noStyle>
          <Input radius="sm" size="sm" className="mb-4" label="微博" />
        </Form.Item>
        <Form.Item name="weibo" noStyle>
          <Input radius="sm" size="sm" className="mb-4" label="Bilibili" />
        </Form.Item>
        <Form.Item name="weibo" noStyle>
          <Input radius="sm" size="sm" className="mb-4" label="小红书" />
        </Form.Item>
        <Form.Item name="weibo" noStyle>
          <Input radius="sm" size="sm" className="mb-4" label="微信公众号" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default SocialMediaForm;
