import React, { FC } from "react";
import { Button } from "@nextui-org/react";
import { SolarAddSquareBold } from "@/assets/icon";
import TagsTable from "./components/tags-table";

export interface PostsProps {
  searchParams: { page: number };
}
const Posts: FC<PostsProps> = ({ searchParams }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold leading-9 text-default-foreground mb-8">
        Tags
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
        <TagsTable />
      </div>
    </div>
  );
};

export default Posts;
