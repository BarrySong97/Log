"use client";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React, { FC } from "react";
export interface CodeBlockProps {}
const CodeBlock: FC<CodeBlockProps> = () => {
  return (
    <NodeViewWrapper className="code-block">
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlock;
