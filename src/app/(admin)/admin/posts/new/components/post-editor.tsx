"use client";
import { JSONContent } from "novel";
import React, { FC, useEffect, useState } from "react";
import Editor from "./editor/advanced-editor";
import { useAtom } from "jotai";
import { postAtom } from "../atom";
import { Post } from "@/app/api/model";
import { usePathname } from "next/navigation";
export interface PostEditorProps {
  data?: Post;
}

const defaultValue = {
  type: "doc",
  content: [],
};
const PostEditor: FC<PostEditorProps> = ({ data }) => {
  const [post, setPost] = useAtom(postAtom);
  const pathname = usePathname();
  const jsonObject = defaultValue;

  useEffect(() => {
    if (pathname === "/admin/posts/new") {
      // setPost({
      //   // ...post,
      //   content: JSON.stringify(defaultValue),
      // });
    }
  }, [pathname]);

  return (
    <Editor
      initialValue={jsonObject}
      onChange={(value, text) => {
        const str = JSON.stringify(value);
        // text 清晰空白字符串，并且把url去除
        // 1. 去除url
        text = text.replace(/(https|http)?:\/\/[^\s]+/g, "");
        // 2. 去除空格
        text = text.replace(/\s/g, "");

        setPost({
          ...post,
          desc: text.slice(0, 256),
          textCount: text?.length ?? 0,
          content: str,
        });
      }}
    />
  );
};

export default PostEditor;
