"use client";
import { JSONContent } from "novel";
import React, { FC, useState } from "react";
import Editor from "./editor/advanced-editor";
import { useAtom } from "jotai";
import { postAtom } from "../atom";
export interface PostEditorProps {}
const defaultValue = {
  type: "doc",
  content: [],
};

const PostEditor: FC<PostEditorProps> = () => {
  const [post, setPost] = useAtom(postAtom);
  const jsonObject = post?.content ? JSON.parse(post.content) : defaultValue;
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
          content: str,
        });
      }}
    />
  );
};

export default PostEditor;
