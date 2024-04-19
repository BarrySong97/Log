"use client";
import { MaterialSymbolsCheckSmall, SolarCopyOutline } from "@/assets/icon";
import { Button } from "@nextui-org/react";
import React, { FC, useRef, useState } from "react";
export interface CodeBlockProps {
  language?: string;
  children: React.ReactNode;
}
const CodeBlock: FC<CodeBlockProps> = ({ language, children }) => {
  const [isCopied, setIsCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const onCopy = () => {
    const text = ref.current?.innerText;
    navigator.clipboard.writeText(text ?? "");
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <div>
      <div
        className="text-foreground  bg-nexa-primary-light px-4 py-2 rounded-t-md flex justify-between items-center"
        contentEditable={false}
      >
        <div className="code-block__language text-sm  tracking-wider">
          {language?.[0]?.toLocaleUpperCase()}
          {language?.slice(1)}
          {!language && "Javascript"}
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
      <div ref={ref} className="rounded-b-md bg-nexa-primary-light">
        {children}
      </div>
    </div>
  );
};

export default CodeBlock;
