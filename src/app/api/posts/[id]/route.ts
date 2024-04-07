import { NextRequest, NextResponse } from "next/server";

import prisma from "@/db";
/**
 *
 * @param _ 获取单个文章
 * @param param1
 * @returns
 */
export async function GET(
  _: any,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const res = await prisma.post.findFirst({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({
    data: res,
  });
}
/**
 *
 * @param _ 删除文章
 * @param param1
 * @returns
 */
export async function DELETE(
  _: any,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const res = await prisma.post.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({
    data: res,
  });
}
/**
 *
 * @returns 更新文章
 */
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const res = await prisma.post.update({
    where: { id: body.id },
    data: {
      ...body,
    },
  });
  return NextResponse.json({
    data: res,
  });
}
