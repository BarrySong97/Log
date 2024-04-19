"use client";
import Link from "next/link";
import { Tag } from "@/app/api/model";
import React, { FC } from "react";
export interface TagListProps {
  data?: Tag[];
}
const TagList: FC<TagListProps> = ({ data }) => {
  return data?.map((tag: Tag) => {
    return (
      <Link
        key={tag.id}
        className="hover:underline underline-offset-4"
        href={`/blogs?tagId=${tag.id}`}
      >
        #{tag.title}
      </Link>
    );
  });
};

export default TagList;
