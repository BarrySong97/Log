"use client";
import React, { FC, useEffect } from "react";
import AvatarUpload from "../../components/avatar-uploader";
import { Form } from "antd";
import { useQuery, useQueryClient } from "react-query";
import { User } from "@/app/api/model";
import { updateAvatar } from "../../service/setting";
import { useForm } from "antd/es/form/Form";
export interface AvatarProps {}
const SettingAvatar: FC<AvatarProps> = () => {
  const client = useQueryClient();
  const updateAvatarFn = async (avatar: string) => {
    await updateAvatar(avatar);
    client.refetchQueries("user");
  };
  const { data: user } = useQuery<User>("user");
  const [form] = Form.useForm();
  useEffect(() => {
    if (form && user) {
      form.setFieldsValue({
        avatar: user?.avatar,
      });
    }
  }, [user]);
  return (
    <Form
      form={form}
      onValuesChange={({ avatar }) => {
        if (avatar) {
          updateAvatarFn(avatar);
        }
      }}
    >
      <Form.Item noStyle name={"avatar"}>
        <AvatarUpload />
      </Form.Item>
    </Form>
  );
};

export default SettingAvatar;
