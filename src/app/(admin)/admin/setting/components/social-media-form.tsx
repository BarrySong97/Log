"use client";
import { User } from "@/app/api/model";
import { Input } from "@nextui-org/react";
import { Form } from "antd";
import React, { FC, useEffect } from "react";
import { useQuery } from "react-query";
import _ from "lodash";
import { updateUserInfo } from "../../service/setting";
export interface SocialMediaFormProps {}
const SocialMediaForm: FC<SocialMediaFormProps> = () => {
  const { data: user } = useQuery<User>("user");
  const [form] = Form.useForm();

  const updateUserInfoFn = _.debounce((value: Partial<User>) => {
    updateUserInfo({
      ...user,
      ...value,
    });
  }, 500);
  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user]);
  return (
    <div>
      <Form form={form} onValuesChange={updateUserInfoFn}>
        <Form.Item name="email" noStyle>
          <Input radius="sm" size="sm" className="mb-4" label="邮箱" />
        </Form.Item>
        <Form.Item name="twitter" noStyle>
          <Input radius="sm" size="sm" className="mb-4" label="Twitter" />
        </Form.Item>
        <Form.Item name="weibo" noStyle>
          <Input radius="sm" size="sm" className="mb-4" label="微博" />
        </Form.Item>
        <Form.Item name="bilibili" noStyle>
          <Input radius="sm" size="sm" className="mb-4" label="Bilibili" />
        </Form.Item>
        <Form.Item name="redbook" noStyle>
          <Input radius="sm" size="sm" className="mb-4" label="小红书" />
        </Form.Item>
        <Form.Item name="wechat" noStyle>
          <Input radius="sm" size="sm" className="mb-4" label="微信公众号" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default SocialMediaForm;
