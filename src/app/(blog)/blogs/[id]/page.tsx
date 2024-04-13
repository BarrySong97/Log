import React, { FC } from "react";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import MarkdownContent from "./components/markdown-content";
import { Post, Tag } from "@/app/api/model";

export interface BlogDetailProps {
  params: { id: string };
}
const BlogDetail: FC<BlogDetailProps> = async ({ params }) => {
  const { id } = params;
  const { data }: { data: Post } = await fetch(
    `${process.env.API_PATH}/api/posts/${id}`
  ).then((res) => res.json());

  const markdown = `Just a link: www.nasa.gov.`;
  return (
    <div className="max-w-5xl  w-full py-8 pb-4  px-16">
      <div className="flex justify-center mb-8">
        <Image
          isBlurred
          src={data?.cover}
          alt="NextUI Album Cover"
          className="m-1 w-full object-cover"
        />
      </div>
      <div className="flex  gap-2 text-small text-default-500 justify-end mb-4">
        {data?.tags.map((tag: Tag) => {
          return (
            <Link
              key={tag.id}
              className="hover:underline underline-offset-4"
              href={"/"}
            >
              #{tag.title}
            </Link>
          );
        })}
        <div>创建时间: 2022-12-13 22:33</div>
        <div>更新时间: 2022-12-13 22:33</div>
      </div>
      <div className="prose">
        <MarkdownContent content={markdown} />
      </div>
    </div>
  );
};

export default BlogDetail;
