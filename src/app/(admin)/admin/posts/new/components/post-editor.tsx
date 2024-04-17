"use client";
import React, { FC, useEffect, useState } from "react";
import Editor from "./editor/advanced-editor";
import { useAtom } from "jotai";
import { TOC, postAtom } from "../atom";
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
function parseHTMLToTOC(htmlString: string): TOC {
  // 将HTML字符串转换为DOM
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // 初始化一个数组来存储标题信息
  const toc: TOC = [];

  // 用于存储当前遍历的层级
  let currentLevel = 0;

  // 获取所有的h1到h6标签
  const headers = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");

  // 遍历所有的标题元素
  Array.from(headers).forEach((header: Element) => {
    // 获取当前标题的层级
    const level = parseInt(header.tagName.charAt(1), 10);
    // 如果当前层级比之前的层级深，则增加当前层级
    if (level > currentLevel) {
      currentLevel++;
    } else if (level < currentLevel) {
      // 如果当前层级比之前的层级浅，则重置当前层级
      currentLevel = level;
    }
    // 提取标题文本
    const text = header.textContent?.trim() ?? "";
    const id = header.getAttribute("id") ?? "";
    // 将层级和标题文本添加到toc数组中
    toc.push({ level, text, id });
  });

  return toc;
}
const PostEditor: FC<PostEditorProps> = ({ data, editabled = true }) => {
  const [post, setPost] = useAtom(postAtom);
  const [editor, seteditor] = useState<TitapEdiotr>();
  const jsonObject = defaultValue;
  useEffect(() => {
    if (data?.content && editor) {
      const content = JSON.parse(data.content ?? "{}");
      setTimeout(() => {
        editor.commands.setContent(content);
      });
    }
  }, [data, editor]);

  return (
    <Editor
      initialValue={jsonObject}
      editabled={editabled}
      onCreate={(Editor) => seteditor(Editor)}
      onChange={(value, text, html) => {
        const str = JSON.stringify(value);
        // text 清晰空白字符串，并且把url去除
        // 1. 去除url
        text = text.replace(/(https|http)?:\/\/[^\s]+/g, "");
        // 2. 去除空格
        text = text.replace(/\s/g, "");

        const toc = parseHTMLToTOC(html ?? "");

        setPost({
          ...post,
          desc: text.slice(0, 256),
          textCount: text?.length ?? 0,
          toc: (toc ?? []) as any,
          html: html,
          content: str,
        });
      }}
    />
  );
};

export default PostEditor;
