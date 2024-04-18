import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import prisma from "@/db";
/**
 *
 * @param _ 获取单个Tag
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
  const res = await prisma.tag.findFirst({
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
 * @param _ 删除Tag
 * @param param1
 * @returns
 */
export const DELETE = auth(
  // @ts-ignore
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const res = await prisma.tag.delete({ where: { id: params.id } });
    return NextResponse.json({ data: res });
  }
);
/**
 *
 * @returns 更新Tag
 */
export const PUT = auth(
  // @ts-ignore
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const body = await req.json();
    const res = await prisma.tag.update({
      where: {
        id: params.id,
      },
      data: {
        ...body,
      },
    });
    return NextResponse.json({ data: res });
  }
);
