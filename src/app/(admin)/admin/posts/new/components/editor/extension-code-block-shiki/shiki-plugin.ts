import { findChildren } from "@tiptap/core";
import { Node as ProsemirrorNode } from "@tiptap/pm/model";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

/**
 * 解析节点数组
 *
 * @param nodes 节点数组
 * @param className 类名数组，默认为空数组
 * @returns 返回一个包含文本和类名数组的对象数组
 */
function parseNodes(
  nodes: any[],
  className: string[] = [],
  style: string[] = []
): { text: string; classes: string[]; styles: string[] }[] {
  return nodes
    .map((node) => {
      const classes = [
        ...className,
        ...(node.properties ? [node.properties.class ?? ""] : []),
      ];
      const styles = [
        ...style,
        ...(node.properties ? [node.properties.style ?? ""] : []),
      ];

      if (node.children) {
        return parseNodes(node.children, classes, styles);
      }

      return {
        text: node.value,
        styles,
        classes,
      };
    })
    .flat();
}

/**
 * 获取高亮节点
 *
 * @param result 高亮结果
 * @returns 高亮节点数组
 */
function getHighlightNodes(result: any) {
  // `.value` for lowlight v1, `.children` for lowlight v2

  return result.value || result.children || [];
}

/**
 * 获取装饰集合
 *
 * @param param0 参数对象
 * @param param0.doc Prosemirror节点
 * @param param0.name 节点类型名称
 * @param param0.lowlight 代码高亮器
 * @param param0.defaultLanguage 默认语言
 * @returns 装饰集合
 */
function getDecorations({
  // 文档对象
  doc,
  // 节点类型名称
  name,
  // 高亮库
  // 默认语言
  highlighter,
}: {
  doc: ProsemirrorNode;
  highlighter: any;
  name: string;
  defaultLanguage: string | null | undefined;
}) {
  // 存储装饰器的数组
  const decorations: Decoration[] = [];

  // 查找文档中的子节点，如果节点类型名称与传入的name相等，则执行回调函数
  findChildren(doc, (node) => node.type.name === name).forEach((block) => {
    // 节点的起始位置
    let from = block.pos + 1;
    // 获取节点的语言属性，如果为空则使用默认语言
    const language = block.node.attrs.language || "javascript";

    // 如果语言有效且支持，则使用指定语言进行高亮；否则使用自动检测语言进行高亮

    const nodes = language
      ? getHighlightNodes(
          highlighter.codeToHast(block.node.textContent, {
            theme: "vitesse-dark",
            lang: language,
          })
        )
      : getHighlightNodes(
          highlighter.codeToHast(block.node.textContent, {
            theme: "vitesse-dark",
            lang: language,
          })
        );

    // 解析高亮节点
    console.log(nodes);

    parseNodes(nodes).forEach((node) => {
      // 节点结束位置
      const to = from + node.text.length;

      // 如果节点有样式类，则创建装饰器并添加到装饰器数组中

      if (node.classes.length) {
        const decoration = Decoration.inline(from, to, {
          class: node.classes.join(" "),
          style: node.styles.join(";"),
        });

        decorations.push(decoration);
      }

      // 更新起始位置为当前节点的结束位置
      from = to;
    });
  });

  // 使用文档对象和装饰器数组创建装饰器集合并返回
  return DecorationSet.create(doc, decorations);
}

function isFunction(param: Function) {
  return typeof param === "function";
}
/**
 * ShikiPlugin 函数用于创建并返回一个用于 ProseMirror 的插件实例，该插件用于代码块的高亮显示。
 *
 * @param options 配置参数对象，包含以下属性：
 *   - name: 字符串类型，表示代码块节点的名称。
 *   - lowlight: 任意类型，表示 lowlight 实例，用于执行代码块的高亮显示。
 *   - defaultLanguage: 字符串类型，表示默认的语言类型。可以为 null 或 undefined。
 * @returns 返回一个 Plugin 实例。
 * @throws 如果 lowlight 实例中缺少 "highlight", "highlightAuto", "listLanguages" 之一的方法，则会抛出错误。
 */
export function ShikiPlugin({
  name,
  shiki,
  defaultLanguage,
}: {
  name: string;
  shiki: any;
  defaultLanguage: string | null | undefined;
}) {
  const highlighter = shiki.higlighter;
  const shikiPlugin: Plugin<any> = new Plugin({
    key: new PluginKey("shiki"),

    state: {
      init: (_, { doc }) =>
        getDecorations({
          doc,
          name,
          highlighter,
          defaultLanguage,
        }),
      apply: (transaction, decorationSet, oldState, newState) => {
        const oldNodeName = oldState.selection.$head.parent.type.name;
        const newNodeName = newState.selection.$head.parent.type.name;
        const oldNodes = findChildren(
          oldState.doc,
          (node) => node.type.name === name
        );
        const newNodes = findChildren(
          newState.doc,
          (node) => node.type.name === name
        );

        if (
          transaction.docChanged &&
          // Apply decorations if:
          // selection includes named node,
          ([oldNodeName, newNodeName].includes(name) ||
            // OR transaction adds/removes named node,
            newNodes.length !== oldNodes.length ||
            // OR transaction has changes that completely encapsulte a node
            // (for example, a transaction that affects the entire document).
            // Such transactions can happen during collab syncing via y-prosemirror, for example.
            transaction.steps.some((step) => {
              // @ts-ignore
              return (
                // @ts-ignore
                step.from !== undefined &&
                // @ts-ignore
                step.to !== undefined &&
                oldNodes.some((node) => {
                  // @ts-ignore
                  return (
                    // @ts-ignore
                    node.pos >= step.from &&
                    // @ts-ignore
                    node.pos + node.node.nodeSize <= step.to
                  );
                })
              );
            }))
        ) {
          return getDecorations({
            doc: transaction.doc,
            name,
            highlighter,
            defaultLanguage,
          });
        }

        return decorationSet.map(transaction.mapping, transaction.doc);
      },
    },

    props: {
      decorations(state) {
        return shikiPlugin.getState(state);
      },
    },
  });

  return shikiPlugin;
}
