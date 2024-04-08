import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param req 更新用户信息
 * @returns
 */
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const res = await prisma.user.create({
    data: body,
  });
  return NextResponse.json({
    data: res,
  });
}
/**
 *
 * @returns 获取用户信息
 */
export async function GET() {
  const res = await prisma.user.findFirst();
  return NextResponse.json({
    data: res,
  });
}