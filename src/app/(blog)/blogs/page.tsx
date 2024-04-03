import React, { FC } from "react";
import { Image } from "@nextui-org/react";
import Link from "next/link";
export interface BlogsProps {}
const Blogs: FC<BlogsProps> = () => {
  const articles = new Array(100).fill("").map((_, i) => ({
    title: `Article lorren lorren lorren lorren lorren lorren lorren lorren lorren lorren  ${i}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  return (
    <div className="scrollElement max-w-5xl  w-full py-8 pb-4  px-16">
      <div className="font-bold text-2xl mb-4">共 {articles.length} 篇文章</div>
      {articles.map((article, index) => (
        <div key={article.title} className="mb-8 ">
          <div className="flex justify-between items-center">
            <Link
              href={`/blogs/${index}`}
              className="text-black text-xl font-medium "
            >
              {article.title}
            </Link>
          </div>
          <div className="flex gap-2 items-center text-small text-default-400">
            <span className="">2023-12-31</span>
            <Link className="hover:underline underline-offset-4" href={"/"}>
              #前端
            </Link>
            <Link className="hover:underline underline-offset-4" href={"/"}>
              #前端
            </Link>
            <Link className="hover:underline underline-offset-4" href={"/"}>
              #前端
            </Link>
          </div>
          <div className="inline-block mt-1 ">
            <div className="float-left mr-6">
              <Image
                className="object-cover rounded-md  mt-2"
                src="https://cdn.sanity.io/images/i81ys0da/production/e1785404ce160170a8cb0964cd982d6d4ee113d3-1200x675.png"
                width={175}
                height={98}
                alt=""
              />
            </div>
            <p className="text-foreground text-base text-justify">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet
              ad soluta voluptatum! In corporis, voluptatibus perferendis
              deleniti sunt itaque, quos alias fugiat dolorem harum nulla,
              repellendus labore modi quae blanditiis. Lorem ipsum dolor, sit
              amet consectetur adipisicing elit. Eveniet ad soluta voluptatum!
              In corporis, voluptatibus perferendis deleniti sunt itaque, quos
              In corporis, voluptatibus perferendis deleniti sunt itaque, quos
              In corporis, voluptatibus perferendis deleniti sunt itaque, quos
              alias fugiat dolorem harum nulla, repellendus labore modi quae
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
