import { NextRequest, NextResponse } from "next/server";

import prisma from "@/db";
import { deleteFile } from "../../file/upload/route";
import { CreatePost } from "@/app/(admin)/admin/posts/new/atom";
/**
 *
 * @param _ 获取单个文章
 * @param param1
 * @returns
 */
export async function GET(
  _: any,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const res = await prisma.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      tags: true,
    },
  });

  return NextResponse.json({
    data: res,
  });
}
/**
 *
 * @param _ 删除文章
 * @param param1
 * @returns
 */
export async function DELETE(
  _: any,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const res = await prisma.post.delete({
    where: {
      id: params.id,
    },
  });
  if (res.cover) {
    deleteFile(res.cover);
  }
  return NextResponse.json({
    data: res,
  });
}
/**
 *
 * @returns 更新文章
 */
export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const body: CreatePost = await req.json();
  const res = await prisma.post.update({
    where: { id: params.id },
    data: {
      title: body.title,
      content: body.content,
      cover: body.cover,
      published: body.published,
      desc: body.desc,
      textCount: body.textCount,
      tags: {
        set: body.tagsId?.map((tag) => ({
          id: tag,
        })),
      },
    },
  });
  return NextResponse.json({
    data: res,
  });
}
