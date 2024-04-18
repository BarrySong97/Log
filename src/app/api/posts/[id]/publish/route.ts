import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
/**
 *
 * @param req 发布或者撤销发布
 * @returns
 */
export const POST = auth(
  // @ts-ignore
  async (
    request: NextRequest,
    {
      params,
    }: {
      params: { id: string };
    }
  ) => {
    const body = await request.json();
    const res = await prisma.post.update({
      where: { id: params.id },
      data: {
        published: !!body.value,
      },
    });
    return NextResponse.json({
      success: true,
    });
  }
);
