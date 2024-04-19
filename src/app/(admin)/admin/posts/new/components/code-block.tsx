"use client";
import { MaterialSymbolsCheckSmall, SolarCopyOutline } from "@/assets/icon";
import { Button } from "@nextui-org/react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React, { FC, useState } from "react";
export interface CodeBlockProps {
  node: {
    attrs: { language?: string };
  };
}
const CodeBlock: FC<CodeBlockProps> = ({ node }) => {
  const { attrs } = node;
  const { language: defaultLanguage } = attrs;
  const [isCopied, setIsCopied] = useState(false);
  const onCopy = () => {
    const content = (node as any).content.content[0].text;
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <NodeViewWrapper className="code-block  ">
      <div className="bg-nexa-primary">
        <div
          className=" text-foreground bg-nexa-primary-light  px-6 py-2 rounded-t-md flex justify-between items-center"
          contentEditable={false}
        >
          <div className="code-block__language text-sm  tracking-wider">
            {defaultLanguage?.[0].toLocaleUpperCase()}
            {defaultLanguage?.slice(1)}
            {!defaultLanguage && "Javascript"}
          </div>
          <div>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              className="text-medium text-foreground"
              onClick={onCopy}
            >
              {isCopied ? <MaterialSymbolsCheckSmall /> : <SolarCopyOutline />}
            </Button>
          </div>
        </div>
        <pre
          className={`${defaultLanguage}  bg-transparent bg-opacity-[0.03] mt-0 rounded-t-none rounded-b-md`}
          style={
            {
              // backgroundColor: "rgb(18, 18, 18)",
            }
          }
        >
          <NodeViewContent
            className={`mt-0 language-${defaultLanguage}`}
            as="code"
          />
        </pre>
      </div>
    </NodeViewWrapper>
  );
};

export default CodeBlock;
