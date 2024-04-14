"use client";
import React, { FC, useEffect, useState } from "react";
import Editor from "./editor/advanced-editor";
import { useAtom } from "jotai";
import { postAtom } from "../atom";
import { Post } from "@/app/api/model";
import { usePathname } from "next/navigation";
import type { Editor as TitapEdiotr } from "@tiptap/core";
export interface PostEditorProps {
  data?: Post;
  editabled?: boolean;
}

const defaultValue = {
  type: "doc",
  content: [],
};
const PostEditor: FC<PostEditorProps> = ({ data, editabled = true }) => {
  const [post, setPost] = useAtom(postAtom);
  const [editor, seteditor] = useState<TitapEdiotr>();
  const jsonObject = defaultValue;
  useEffect(() => {
    if (data && editor) {
      const content = JSON.parse(data.content ?? "{}");
      editor.commands.setContent(content);
    }
  }, [data, editor]);

  return (
    <Editor
      initialValue={jsonObject}
      editabled
      onCreate={(Editor) => seteditor(Editor)}
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
