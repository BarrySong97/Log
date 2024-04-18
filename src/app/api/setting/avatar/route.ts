import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { deleteFile } from "../../file/upload/route";
import { auth } from "@/auth";
/**
 *
 * @param req 更新用户头像
 * @returns
 */
export const PUT = auth(async (req: NextRequest) => {
  const body = await req.json();
  const old = await prisma.user.findFirst({
    where: {
      id: body.id,
    },
  });
  const res = await prisma.user.update({
    where: {
      id: old?.id,
    },
    data: {
      avatar: body.avatar,
    },
  });
  if (old?.avatar && old?.avatar !== body.avatar) {
    deleteFile(old.avatar);
  }
  return NextResponse.json({
    data: res,
  });
});
