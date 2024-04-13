"use client";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React, { FC } from "react";
export interface CodeBlockProps {
  node: {
    attrs: { language?: string };
  };
}
const CodeBlock: FC<CodeBlockProps> = ({
  node: {
    attrs: { language: defaultLanguage },
  },
}) => {
  return (
    <NodeViewWrapper className="code-block  ">
      <div
        style={{
          backgroundColor: "rgb(18, 18, 18)",
        }}
        className=" text-white px-6 rounded-t-md "
        contentEditable={false}
      >
        <span className="code-block__language text-sm tracking-wider">
          {defaultLanguage?.[0].toLocaleUpperCase()}
          {defaultLanguage?.slice(1)}
        </span>
      </div>
      <pre className={`${defaultLanguage} mt-0 rounded-t-none`}>
        <NodeViewContent
          className={`mt-0 language-${defaultLanguage}`}
          as="code"
        />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlock;
