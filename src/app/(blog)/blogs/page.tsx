import React, { FC } from "react";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { Post } from "@/app/api/model";
import dayjs from "dayjs";
import { formatDateOrDaysAgo } from "@/utils/date";
import { MaterialSymbolsCalendarClockOutline } from "@/assets/icon";
export interface BlogsProps {}
const Blogs: FC<BlogsProps> = async () => {
  const { data } = await fetch(
    `${process.env.API_PATH}/api/posts?published=1`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  return (
    <div className="scrollElement  max-w-5xl  w-full py-8 pb-4  px-4 lg:px-0">
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
