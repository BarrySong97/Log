import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import prisma from "@/db";
import { deleteFile } from "../../file/upload/route";
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
  const res = await prisma.project.findFirst({
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
export const DELETE = auth(
  // @ts-ignore
  async (
    _: any,
    {
      params,
    }: {
      params: { id: string };
    }
  ) => {
    const res = await prisma.project.delete({
      where: {
        id: params.id,
      },
    });
    if (res.icon) {
      try {
        deleteFile(res.icon);
      } catch (error) {}
    }
    return NextResponse.json({
      data: res,
    });
  }
);
/**
 *
 * @returns 更新文章
 */
export const PUT = auth(async (req: NextRequest) => {
  const body = await req.json();
  const res = await prisma.project.update({
    where: { id: body.id },
    data: {
      ...body,
    },
  });
  return NextResponse.json({
    data: res,
  });
});
