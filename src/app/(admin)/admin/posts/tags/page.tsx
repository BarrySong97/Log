import React, { FC, useState } from "react";
import TagsTable from "./components/tags-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tag管理 - Barry Song's 小宇宙",
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
export interface PostsProps {
  searchParams: { page: number };
}
const Posts: FC<PostsProps> = ({ searchParams }) => {
  const page = searchParams?.page ?? 1;
  return (
    <div>
      <h1 className="text-3xl font-bold leading-9 text-default-foreground mb-8">
        Tags
      </h1>
      <div className="flex flex-col items-center">
        <TagsTable page={page} />
      </div>
    </div>
  );
};

export default Posts;
