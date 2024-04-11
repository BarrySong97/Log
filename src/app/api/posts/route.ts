import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { CreatePost } from "@/app/(admin)/admin/posts/new/atom";

export async function GET() {
  const res = await prisma.post.findMany();
  return NextResponse.json({
    data: res,
  });
}
export async function POST(req: NextRequest) {
  const body: CreatePost = await req.json();
  const tagsId = body.tagsId;
  const res = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      desc: "",
      textCount: 0,
      Tag: {
        connect: tagsId.map((id) => ({ id })),
      },
    },
  });
  return NextResponse.json({
    data: res,
  });
}
