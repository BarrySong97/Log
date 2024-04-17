import React, { FC } from "react";
import { Image } from "@nextui-org/react";
import { Post, Tag } from "@/app/api/model";
import { TOC } from "@/app/(admin)/admin/posts/new/atom";
import Toc from "./components/toc";
import Link from "next/link";
import parse, { domToReact } from "html-react-parser";
import CodeBlock from "./components/code-block";
import Content from "./components/content";
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
      <div className="max-w-5xl mx-auto">
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
        <div className="flex  gap-2 text-small text-default-500 justify-end mb-8">
          {data?.tags.map((tag: Tag) => {
            return (
              <Link
                key={tag.id}
                className="hover:underline underline-offset-4"
                href={"/"}
              >
                #{tag.title}
              </Link>
            );
          })}
          <div>创建时间: 2022-12-13 22:33</div>
          <div>更新时间: 2022-12-13 22:33</div>
        </div>
      </div>
      <div className="blog-view mx-auto justify-center   relative flex min-h-[120px] ">
        <div className="max-w-5xl mr-12 basis-[100%] prose break-all">
          <Content>{postElement}</Content>
        </div>
        <div
          className={`sticky ${
            toc.length ? "-mr-40" : "-mr-16"
          } top-[120px] mt-[120px] h-[calc(100vh-6rem-4.5rem-150px-120px)]`}
        >
          <div>
            <Toc data={toc} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
