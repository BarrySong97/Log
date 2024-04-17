"use client";
import React, { useEffect, useState } from "react";
import {
  EditorRoot,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorContent,
  type JSONContent,
  EditorCommandList,
  EditorBubble,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { defaultExtensions } from "./extensions";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { ColorSelector } from "./selectors/color-selector";
import { CodeBlockLowShiki } from "./extension-code-block-shiki/code-block-shiki";
import { Extensions, ReactNodeViewRenderer } from "@tiptap/react";
import CodeBlock from "../code-block";
import { getHighlighter } from "shiki";
import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { uploadFn } from "./image-upload";
import { Separator } from "../ui/separator";
import { languages } from "./languages";

const extensions = [...defaultExtensions, slashCommand];

interface EditorProp {
  initialValue?: JSONContent;
  onChange: (value: JSONContent, text: string, html: string) => void;
  editabled?: boolean;
  onCreate: (editor: any) => void;
}
const shiki = CodeBlockLowShiki.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlock);
  },
});
const Editor = ({
  editabled,
  initialValue,
  onChange,
  onCreate,
}: EditorProp) => {
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [asyncExtensions, setExtensions] = useState<Extensions>(extensions);
  const getShikiHightlight = async () => {
    const higlighter = await getHighlighter({
      langs: languages,
      themes: ["vitesse-dark"],
    });
    setExtensions([
      ...extensions,
      shiki.configure({
        shiki: {
          higlighter,
        },
      }),
    ]);
  };
  useEffect(() => {
    getShikiHightlight();
  }, []);

  const isShikiLoaded = asyncExtensions.find((ext) => ext.name === "codeBlock");
  return isShikiLoaded ? (
    <EditorRoot>
      <EditorContent
        className="blog-content-wrapper border max-w-7xl overflow-auto scrollbar relative h-full w-full  border-muted bg-background sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg rounded-md"
        {...(initialValue && { initialContent: initialValue })}
        extensions={asyncExtensions}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
          handleDrop: (view, event, _slice, moved) =>
            handleImageDrop(view, event, moved, uploadFn),
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
          },
        }}
        editable={editabled}
        onCreate={({ editor }) => {
          onCreate(editor);
        }}
        onUpdate={({ editor }) => {
          onChange(editor.getJSON(), editor.getText(), editor.getHTML());
        }}
        slotAfter={<ImageResizer />}
      >
        <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-muted-foreground">
            No results
          </EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => item.command?.(val)}
                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                key={item.title}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>

        <EditorBubble
          tippyOptions={{
            placement: "top",
          }}
          className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
        >
          <Separator orientation="vertical" />
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <Separator orientation="vertical" />

          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <Separator orientation="vertical" />
          <TextButtons />
          <Separator orientation="vertical" />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  ) : (
    <div className="blog-content-wrapper flex justify-center items-center border max-w-7xl overflow-auto scrollbar relative h-full w-full  border-muted bg-background sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg rounded-md">
      编辑器加载中...
    </div>
  );
};

export default Editor;
