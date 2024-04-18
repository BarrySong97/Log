import React, { FC } from "react";
import { Image } from "@nextui-org/react";
import { Post } from "@/app/api/model";
import TagList from "./components/tag-list";
import PostDetail from "./components/post";
export interface BlogDetailProps {
  params: { id: string };
}
const BlogDetail: FC<BlogDetailProps> = async ({ params }) => {
  const { id } = params;
  const { data }: { data: Post } = await fetch(
    `${process.env.API_PATH}/api/posts/${id}?published=1`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  return (
    <div className=" w-full py-8 pt-10 pb-4  relative px-16 z-50">
      <div className="max-w-5xl mx-auto mb-4">
        {data.cover ? (
          <div className="flex justify-center mb-8">
            <Image
              isBlurred
              classNames={{
                blurredImg: "scale-[1.03]",
              }}
              src={data?.cover}
              alt="NextUI Album Cover"
              className="m-1 w-full object-cover"
            />
          </div>
        ) : null}
        <div className="px-2">
          <div className="text-6xl font-bold mb-4 ">{data.title}</div>
          <div className="flex  gap-2 text-small text-default-500 justify-start pl-1">
            <TagList data={data.tags} />
            <div>创建时间: 2022-12-13 22:33</div>
            <div>更新时间: 2022-12-13 22:33</div>
          </div>
        </div>
      </div>
      <PostDetail data={data} />
    </div>
  );
};

export default BlogDetail;
