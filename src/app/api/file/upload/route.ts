import OSS from "ali-oss";

import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const ossConfig = {
  accessKeyId: process.env.OSS_ACCESS_KEY ?? "",
  accessKeySecret: process.env.OSS_Access_KEY_SECRET ?? "",
  bucket: process.env.ALI_Bucket ?? "",
};
const client = new OSS(ossConfig);
export const deleteFile = async (url: string) => {
  const parts = url.split(".aliyuncs.com/");
  const result = parts[1]; // 这将获取到"/测试3"

  const res = await client.delete(result);
};
export const GET = auth(async (request: Request) => {
  try {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const policy = {
      expiration: date.toISOString(),
      conditions: [
        ["content-length-range", 0, 1024 * 1024 * 30], // 设置上传文件的大小限制为30M
      ],
    };

    // 生成签名，策略等信息
    const formData = client.calculatePostSignature(policy);

    // 生成 bucket 域名，客户端将向此地址发送请求
    const location = await client.getBucketLocation(
      process.env.ALI_Bucket ?? "main-resource"
    );
    const host = `https://${ossConfig.bucket}.${location.location}.aliyuncs.com`;

    // 响应给客户端的签名和策略等信息
    const body = {
      policy: formData.policy,
      signature: formData.Signature,
      location: location.location,
      accessId: formData.OSSAccessKeyId,
      host,
      expire: 4 * 60,
    };
    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 } // The webhook will retry 5 times waiting for a 200
    );
  }
});

export const DELETE = auth(async (request: Request) => {
  try {
    const body = await request.json();
    await deleteFile(body.url);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 } // The webhook will retry 5 times waiting for a 200
    );
  }
});
