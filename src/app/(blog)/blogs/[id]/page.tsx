import React, { FC } from "react";
import { Image } from "@nextui-org/react";
import { Post } from "@/app/api/model";
import { TOC } from "@/app/(admin)/admin/posts/new/atom";
import Toc from "./components/toc";
import Link from "next/link";
import parse, { domToReact } from "html-react-parser";
import CodeBlock from "./components/code-block";
import Content from "./components/content";
import TagList from "./components/tag-list";
export interface BlogDetailProps {
  params: { id: string };
}
const BlogDetail: FC<BlogDetailProps> = async ({ params }) => {
  const { id } = params;
  const { data }: { data: Post } = await fetch(
    `${process.env.API_PATH}/api/posts/${id}?published=1`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  const toc: TOC = JSON.parse(data?.toc ?? "[]");
  const postElement = parse(data.html, {
    replace(domNode) {
      const codeElement = domNode.children?.[0];

      if (domNode.name === "pre" && codeElement?.name === "code") {
        const lang = domNode.attribs?.class?.split("language-")[1];
        return <CodeBlock language={lang}>{domToReact([domNode])}</CodeBlock>;
      }
    },
  });
  return (
    <div className=" w-full py-8 pt-10 pb-4  relative px-16 z-50">
      <div className="max-w-5xl mx-auto mb-4">
        {data.cover ? (
          <div className="flex justify-center mb-8">
            <Image
              isBlurred
              classNames={{
                blurredImg: "scale-[1.03]",
              }}
              src={data?.cover}
              alt="NextUI Album Cover"
              className="m-1 w-full object-cover"
            />
          </div>
        ) : null}
        <div className="px-2">
          <div className="text-6xl font-bold mb-4 ">{data.title}</div>
          <div className="flex  gap-2 text-small text-default-500 justify-start pl-1">
            <TagList data={data.tags} />
            <div>创建时间: 2022-12-13 22:33</div>
            <div>更新时间: 2022-12-13 22:33</div>
          </div>
        </div>
      </div>
      <div className="ml-[calc((100%-64rem)/2+12px)] ">
        <div className="blog-view  justify-start relative flex min-h-[120px] ">
          <div className="max-w-5xl mr-12  basis-[100%] prose break-all">
            <Content>{postElement}</Content>
            <div className="mt-8">
              <Link
                className="hover:text-black text-gray-500 underline-offset-4 "
                href={"/blogs"}
              >
                cd..
              </Link>
            </div>
          </div>
          <div
            className={`sticky max-w-[200px] top-[120px] mt-[120px] h-[calc(100vh-6rem-4.5rem-150px-120px)]`}
          >
            <div>
              <Toc data={toc} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
