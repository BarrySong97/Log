import React, { FC } from "react";
import { Image } from "@nextui-org/react";

export interface BlogDetailProps {}
const BlogDetail: FC<BlogDetailProps> = () => {
  return (
    <div className="max-w-5xl  w-full py-8 pb-4  px-16">
      <div className="flex justify-center mb-8">
        <Image
          isBlurred
          src="https://cdn.sanity.io/images/i81ys0da/production/e1785404ce160170a8cb0964cd982d6d4ee113d3-1200x675.png"
          alt="NextUI Album Cover"
          className="m-1 w-full object-cover"
        />
      </div>
      <div className="flex  gap-2 text-small text-default-500 justify-end mb-4">
        <div>创建时间: 2022-12-13 22:33</div>
        <div>更新时间: 2022-12-13 22:33</div>
      </div>
      <div>content</div>
    </div>
  );
};

export default BlogDetail;
