import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { auth } from "@/auth";

export const GET = async () => {
  const res = await prisma.tag.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json({
    data: res,
  });
};
export const POST = auth(async (req: NextRequest) => {
  const body = await req.json();
  const res = await prisma.tag.create({
    data: body,
  });
  return NextResponse.json({
    data: res,
  });
});
