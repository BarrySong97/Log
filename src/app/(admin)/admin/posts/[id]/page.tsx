import React, { FC } from "react";
import PostEditor from "../new/components/post-editor";
import "./prosemirror.css";
import "./uploader.css";
import PostMeta from "../new/components/post-meta";
import { Metadata } from "next";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "编辑文章 - Barry Song's 小宇宙",
  openGraph: {
    title: {
      default: "Barry Song's Blog",
      template: "%s | Barry Song的小宇宙",
    },
    description: "探索宇宙，永葆青春",
    siteName: "Barry Song's Blog",
    locale: "zh_CN",
    type: "website",
    url: "https://www.barrysong4real.cc/",
  },
};
export interface EditPost {
  params: { id: string };
}
const EditPost: FC<EditPost> = async ({ params }) => {
  const { id } = params;
  const { data } = await fetch(`${process.env.API_PATH}/api/posts/${id}`, {
    cache: "no-cache",
  }).then((v) => v.json());

  return (
    <div className="flex gap-4 h-full">
      <PostEditor data={data} />
      <div className="flex-1 flex flex-col gap-4">
        <PostMeta data={data} />
      </div>
    </div>
  );
};

export default EditPost;
