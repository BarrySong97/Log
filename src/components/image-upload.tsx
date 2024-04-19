"use client";
import { Spin, Upload, UploadProps, message } from "antd";
import React, { FC, useState } from "react";
import { SolarCloudUploadBroken } from "@/assets/icon";
import useOssSignature from "@/hooks/useOSS";
import clsx from "clsx";
export interface VercelImageUplodProps {
  value?: string;
  filename?: string;
  imageType: "icon" | "cover";
  text: string;
  onChange?: (value: string) => void;
}
const ImageUplod: FC<VercelImageUplodProps> = ({
  value,
  filename,
  imageType,
  onChange,
  text,
}) => {
  const [uploadLoading, setUploadLoading] = useState(false);
  const ossSignature = useOssSignature();

  const getExtraData: UploadProps["data"] = (file) => ({
    key: `${filename ?? file.name}`,
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
      onChange?.(`${ossSignature?.host}/${filename ?? info.file.name}`);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      setUploadLoading(false);
    }
  };

  const renderBody = () => {
    if (value) {
      return (
        <img
          src={value}
          alt="icon"
          className={
            imageType === "icon" ? "" : "w-full h-full object-cover rounded-md"
          }
        />
      );
    }
    if (uploadLoading) {
      return <Spin />;
    }
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <SolarCloudUploadBroken className="text-xl" />
        <div className="mt-1">{text}</div>
      </div>
    );
  };
  const className = clsx({
    "h-[150px] mb-4": imageType === "cover",
  });
  return (
    <div className={className}>
      <Upload
        action={ossSignature?.host}
        beforeUpload={_beforeUpload}
        data={getExtraData}
        name={"file"}
        listType="picture-card"
        method="post"
        className={`avatar-uploader h-full  !mb-4 w-full `}
        rootClassName="w-full"
        showUploadList={false}
        onChange={onFileChnage}
      >
        {renderBody()}
      </Upload>
    </div>
  );
};

export default ImageUplod;
