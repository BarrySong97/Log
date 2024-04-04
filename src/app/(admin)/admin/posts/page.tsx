import React, { FC } from "react";
import PostTable from "./components/post-table";

export interface PostsProps {}
const Posts: FC<PostsProps> = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold leading-9 text-default-foreground mb-8">
        文章
      </h1>
      <div className="flex flex-col items-center">
        <PostTable />
      </div>
    </div>
  );
};

export default Posts;
