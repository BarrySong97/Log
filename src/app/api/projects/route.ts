import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function GET() {
  const res = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json({
    data: res,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await prisma.project.create({
    data: body,
  });
  return NextResponse.json({
    data: res,
  });
}
