import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { CreatePost } from "@/app/(admin)/admin/posts/new/atom";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const published = !!Number(searchParams.get("published"));

  if (searchParams.get("published")) {
    const res = await prisma.post.findMany({
      where: {
        published: published,
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
  } else {
    const res = await prisma.post.findMany({
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
}
export async function POST(req: NextRequest) {
  const body: CreatePost = await req.json();
  const tagsId = body.tagsId;
  const res = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      cover: body.cover,
      published: body.published,
      desc: body.desc,
      textCount: body.textCount,
      tags: {
        connect: tagsId.map((id) => ({ id })),
      },
    },
  });

  return NextResponse.json({
    data: res,
  });
}
