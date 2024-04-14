import React, { FC } from "react";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { Post } from "@/app/api/model";
export interface BlogsProps {}
const Blogs: FC<BlogsProps> = async () => {
  const { data } = await fetch(
    `${process.env.API_PATH}/api/posts?published=1`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  return (
    <div className="scrollElement max-w-5xl  w-full py-8 pb-4  px-16">
      <div className="font-bold text-2xl mb-4">共 {data.length} 篇文章</div>
      {data?.map((article: Post) => (
        <div key={article.title} className="mb-8 ">
          <div className="flex justify-between items-center">
            <Link
              href={`/blogs/${article.id}`}
              className="text-black text-xl font-medium "
            >
              {article.title}
            </Link>
          </div>
          <div className="flex gap-2 items-center text-small text-default-400">
            <span className="">2023-12-31</span>
            {article.tags.map((tag) => {
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
          </div>
          <div className="flex">
            <div className=" mr-6">
              <Image
                className="object-cover rounded-md  mt-2"
                src={article.cover}
                width={175}
                height={98}
                alt=""
              />
            </div>
            <p className="text-foreground text-base text-justify">
              {article.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
