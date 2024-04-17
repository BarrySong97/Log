"use client";
import { TOC } from "@/app/(admin)/admin/posts/new/atom";
import React, { FC } from "react";
import TocItem from "./toc-item";
export interface TocProps {
  data: TOC;
}
const Toc: FC<TocProps> = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <div key={item.text} className="flex text-sm items-center gap-2">
          <TocItem item={item} />
        </div>
      ))}
    </div>
  );
};

export default Toc;
