import CodeBlock, { CodeBlockOptions } from "@tiptap/extension-code-block";

import { ShikiPlugin } from "./shiki-plugin";

export interface CodeBlockShikiOptions extends CodeBlockOptions {
  defaultLanguage: string | null | undefined;
  shiki: any;
}

export const CodeBlockLowShiki = CodeBlock.extend<CodeBlockShikiOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      shikiHighlighter: {},
      defaultLanguage: null,
    };
  },

  addProseMirrorPlugins() {
    return [
      ...(this.parent?.() || []),
      ShikiPlugin({
        name: this.name,
        shiki: this.options.shiki,
        defaultLanguage: this.options.defaultLanguage,
      }),
    ];
  },
});
