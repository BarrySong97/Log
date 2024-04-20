import React, { FC } from "react";
import PostEditor from "./components/post-editor";
import "./prosemirror.css";
import "./uploader.css";
import "./dracula.css";
import PostMeta from "./components/post-meta";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "新文章 - Barry Song's 小宇宙",
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
export interface EditPost {}
const EditPost: FC<EditPost> = () => {
  return (
    <div className="flex gap-4 h-full">
      <PostEditor />
      <div className="flex-1 flex flex-col gap-4">
        <PostMeta />
      </div>
    </div>
  );
};

export default EditPost;
