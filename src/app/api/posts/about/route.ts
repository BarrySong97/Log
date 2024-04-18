import prisma from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await prisma.post.findFirst({
    where: {
      about: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
    },
  });

  return NextResponse.json({
    data: res,
  });
}
