import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
/**
 *
 * @param req 更新用户信息
 * @returns
 */
export const PUT = auth(async (req: NextRequest) => {
  const body = await req.json();
  const res = await prisma.user.update({
    where: {
      id: body.id,
    },
    data: {
      ...body,
    },
  });
  return NextResponse.json({
    data: res,
  });
});
/**
 *
 * @returns 获取用户信息
 */
export async function GET() {
  const res = await prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      avatar: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      weibo: true,
      twitter: true,
      bilibili: true,
      wechat: true,
      redbook: true,
      password: false,
    },
  });
  return NextResponse.json({
    data: res,
  });
}
