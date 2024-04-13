"use client";
import { Spin, Upload, UploadProps, message } from "antd";
import React, { FC, useState } from "react";
import useOssSignature from "@/hooks/useOSS";
import { Avatar } from "@nextui-org/react";
export interface VercelImageUplodProps {
  value?: string;
  onChange?: (value: string) => void;
}
const AvatarUpload: FC<VercelImageUplodProps> = ({ value, onChange }) => {
  const [uploadLoading, setUploadLoading] = useState(false);
  const ossSignature = useOssSignature();

  const getExtraData: UploadProps["data"] = (file) => ({
    key: `${file.name}`,
    OSSAccessKeyId: ossSignature?.accessId,
    policy: ossSignature?.policy,
    success_action_status: "200",
    Signature: ossSignature?.signature,
  });
  const _beforeUpload: UploadProps["beforeUpload"] = (file: any, fileList) => {
    if (!ossSignature) {
      message.error("require signature!");
      return false;
    }
    return file;
  };
  const onFileChnage: UploadProps["onChange"] = (info) => {
    if (!ossSignature) {
      return;
    }
    if (info.file.status === "uploading") {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setUploadLoading(false);
      onChange?.(`${ossSignature?.host}/${info.file.name}`);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      setUploadLoading(false);
    }
  };

  const renderBody = () => {
    return (
      <Avatar
        icon={uploadLoading ? <Spin /> : null}
        src={value}
        isBordered
        size="lg"
      />
    );
  };
  return (
    <div>
      <Upload
        action={ossSignature?.host}
        beforeUpload={_beforeUpload}
        data={getExtraData}
        name={"file"}
        method="post"
        showUploadList={false}
        onChange={onFileChnage}
      >
        {renderBody()}
      </Upload>
    </div>
  );
};

export default AvatarUpload;
