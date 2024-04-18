import prisma from "@/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const GET = auth(async () => {
  const postCount = await prisma.post.count();
  const projectCount = await prisma.project.count();
  const textCount = await prisma.post.aggregate({
    _sum: {
      textCount: true,
    },
  });

  return NextResponse.json({
    data: {
      postCount,
      projectCount,
      textCount: textCount._sum.textCount ?? 0,
    },
  });
});
