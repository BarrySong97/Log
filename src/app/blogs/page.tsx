import React, { FC } from "react";
import dayjs from "dayjs";
import Link from "next/link";
export interface BlogsProps {}
const Blogs: FC<BlogsProps> = () => {
  const articles = new Array(100).fill("").map((_, i) => ({
    title: `Article lorren lorren lorren lorren lorren lorren lorren lorren lorren lorren  ${i}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  return (
    <div className=" max-w-5xl  w-full py-8 pb-4  px-16">
      <div className="font-bold text-2xl mb-4">共 {articles.length} 篇文章</div>
      {articles.map((article) => (
        <div
          key={article.title}
          className="mb-4 justify-between flex items-center"
        >
          <Link
            href={"/"}
            className="hover:underline underline-offset-4 text-large "
          >
            {article.title}
          </Link>
          <div className="text-default-500 text-small">
            {dayjs(article.createdAt).format("YYYY-MM-DD")}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
