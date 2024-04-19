import { codeToHtml } from "shiki";
import {
  transformerNotationDiff,
  transformerMetaWordHighlight,
} from "@shikijs/transformers";
async function highlightCode(language: string, code: string) {
  // 这里应该是高亮代码的逻辑，为了示例，我们只是简单地返回传入的代码字符串
  // 实际上，这里可能会调用某个高亮库，如highlight.js等
  return codeToHtml(code, {
    lang: language ?? "javascript",
    theme: "github-light",
    transformers: [transformerMetaWordHighlight(), transformerNotationDiff()],
  });
}

// 解析HTML字符串并提取pre下code元素的内容
async function extractCodeFromPre(htmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const preElements = doc.querySelectorAll("pre code");

  const promiseList = Array.from(preElements).map((element) => {
    const codeHtml = element.innerHTML;
    // 使用高亮函数处理代码
    const lang = element.className.split("language-")[1];

    const highlightedCodeHtml = highlightCode(lang, codeHtml);

    // 在highlightedCodeHtml 上面加上class
    // 否则，样式会失效

    return highlightedCodeHtml;
  });

  return Promise.all(promiseList);
}

// 替换原始HTML字符串中的pre元素内容为高亮后的代码
function replacePreCodeWithHighlightedHtml(
  originalHtml: string,
  highlightedCodes: string[]
): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(originalHtml, "text/html");

  // 获取所有的pre元素
  const preElements = doc.querySelectorAll("pre");

  preElements.forEach((preElement, index) => {
    // 如果高亮代码对象中有对应的高亮代码HTML，则替换
    const newContent = highlightedCodes[index];
    // 直接把pre替换, 而不是替换内部
    const codeElement = preElement.querySelector("code");

    const lang = codeElement?.className.split("language-")[1];
    preElement.outerHTML = newContent.replace(
      "shiki vitesse-dark",
      `shiki vitesse-dark scrollbar language-${lang ?? "javascript"}`
    );
  });
  const body = doc.body.innerHTML;
  // 将修改后的文档转换回HTML字符串
  return body;
}

export async function compositionHighlightCode(html: string) {
  const highlightedCodes = await extractCodeFromPre(html);
  const updatedHtml = replacePreCodeWithHighlightedHtml(html, highlightedCodes);
  // 只要updatedHtml  body中的内容

  return updatedHtml;
}
