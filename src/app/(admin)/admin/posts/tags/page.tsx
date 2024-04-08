import React, { FC, useState } from "react";
import TagsTable from "./components/tags-table";

export interface PostsProps {
  searchParams: { page: number };
}
const Posts: FC<PostsProps> = ({ searchParams }) => {
  const page = searchParams?.page ?? 1;
  return (
    <div>
      <h1 className="text-3xl font-bold leading-9 text-default-foreground mb-8">
        Tags
      </h1>
      <div className="flex flex-col items-center">
        <TagsTable page={page} />
      </div>
    </div>
  );
};

export default Posts;
