import React, { FC } from "react";
import PostTable from "./components/post-table";
import { Button } from "@nextui-org/react";
import { SolarAddSquareBold } from "@/assets/icon";

export interface PostsProps {}
const Posts: FC<PostsProps> = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold leading-9 text-default-foreground mb-8">
        文章
      </h1>
      <div className="mb-4">
        <Button
          color="primary"
          as={"a"}
          href="/admin/posts/new"
          radius="sm"
          startContent={<SolarAddSquareBold className="text-large" />}
        >
          创建文章
        </Button>
      </div>
      <div className="flex flex-col items-center">
        <PostTable />
      </div>
    </div>
  );
};

export default Posts;
