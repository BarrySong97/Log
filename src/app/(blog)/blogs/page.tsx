import React, { FC } from "react";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { Post, Tag } from "@/app/api/model";
import dayjs from "dayjs";
import { formatDateOrDaysAgo } from "@/utils/date";
import { MaterialSymbolsCalendarClockOutline } from "@/assets/icon";
import TagList from "./[id]/components/tag-list";
import { Metadata } from "next";
import { seo } from "@/app/seo";
export const metadata: Metadata = {
  title: "博客 - Barry's Blog",
  description: "分享我的见解，思想，生活过的痕迹",
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
  twitter: {
    ...seo.twitter,
  },
};
export interface BlogsProps {
  searchParams: { tagId: string };
}
const Blogs: FC<BlogsProps> = async ({ searchParams }) => {
  const { data } = await fetch(
    `${process.env.API_PATH}/api/posts?published=1&tagId=${searchParams.tagId}`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());
  const currentTag: Tag | null = data?.[0]?.tags?.find(
    (v: Tag) => v.id === searchParams.tagId
  );

  return (
    <div className="scrollElement  max-w-5xl  w-full py-8 pb-4  px-4 lg:px-0">
      <div className="flex  gap-2 lg:justify-start justify-between text-foreground  mb-8">
        {currentTag ? (
          <div className="text-2xl  lg:text-3xl font-bold">
            #{currentTag?.title}
          </div>
        ) : null}
        <div className="text-medium self-end text-default-400">
          共 {data?.length ?? 0} 篇文章
        </div>
      </div>
      {data?.map((article: Post) => (
        <div key={article.title} className="mb-8 lg:mb-16 block">
          <div className="flex justify-between items-center mb-3">
            <Link
              href={`/blogs/${article.id}`}
              className="text-foreground text-xl font-bold hover:underline underline-offset-8"
            >
              {article.title}
            </Link>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <p className="text-default-700 min-h-[100px] text-sm lg:text-base text-justify flex-1 break-all mb-1">
                {article.desc}
              </p>
              <div className="flex gap-2 items-center text-small text-default-400 ">
                <span
                  title={dayjs(article.updatedAt).format("YYYY-MM-DD HH:mm")}
                  className="flex items-center gap-1"
                >
                  <MaterialSymbolsCalendarClockOutline />
                  {formatDateOrDaysAgo(data.updatedAt)}
                </span>
                <TagList data={article.tags} />
              </div>
            </div>
            {article.cover ? (
              <div className=" mr-6">
                <Image
                  className="object-cover w-[100px] h-[70px] lg:w-[190px] lg:h-[105px] rounded-md  mt-2"
                  src={article.cover}
                  width={175}
                  height={98}
                  alt=""
                />
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
