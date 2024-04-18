import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { CreatePost } from "@/app/(admin)/admin/posts/new/atom";
import { auth } from "@/auth";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const published = !!Number(searchParams.get("published"));

  if (searchParams.get("published")) {
    const res = await prisma.post.findMany({
      where: {
        published: published,
        about: false,
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
export const POST = auth(async (req: NextRequest) => {
  const body: CreatePost = await req.json();
  const tagsId = body.tagsId;
  const res = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      toc: body.toc as any as string,
      cover: body.cover,
      published: body.published,
      html: body.html,
      desc: body.desc,
      about: body.about,
      textCount: body.textCount,
      tags: {
        connect: tagsId.map((id) => ({ id })),
      },
    },
  });

  return NextResponse.json({
    data: res,
  });
});
