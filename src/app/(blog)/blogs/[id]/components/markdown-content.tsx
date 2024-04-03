import React, { FC } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
export interface MarkdownContentProps {
  content: string;
}
const MarkdownContent: FC<MarkdownContentProps> = ({ content }) => {
  return <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>;
};

export default MarkdownContent;
