import React, { FC } from "react";
import PostTable from "./components/post-table";
import { Button } from "@nextui-org/react";
import { SolarAddSquareBold } from "@/assets/icon";

export interface PostsProps {
  searchParams: { page: number };
}
const Posts: FC<PostsProps> = ({ searchParams }) => {
  const page = searchParams?.page || 1;
  return (
    <div>
      <h1 className="text-3xl font-bold leading-9 text-default-foreground mb-8">
        文章
      </h1>
      <div className="flex flex-col items-center">
        <PostTable page={page} />
      </div>
    </div>
  );
};

export default Posts;
