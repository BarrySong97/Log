import { Post } from "@/app/api/model";
import React, { FC } from "react";
import { TOC } from "@/app/(admin)/admin/posts/new/atom";
import Link from "next/link";
import parse, { domToReact } from "html-react-parser";
import CodeBlock from "./code-block";
import Content from "./content";
import Toc from "./toc";
import Comments from "./comments";
export interface PostDetailProps {
  data?: Post;
}
const PostDetail: FC<PostDetailProps> = ({ data }) => {
  const toc: TOC = JSON.parse(data?.toc ?? "[]");
  const postElement = parse(data?.html ?? "", {
    replace(domNode) {
      const codeElement = domNode.children?.[0];

      if (domNode.name === "pre" && codeElement?.name === "code") {
        const lang = domNode.attribs?.class?.split("language-")[1];
        return <CodeBlock language={lang}>{domToReact([domNode])}</CodeBlock>;
      }
    },
  });
  return (
    <div className="xl:ml-[calc((100%-64rem)/2+12px)] lg:ml-[12px]">
      <div className="blog-view  justify-start relative flex  ">
        <div className="lg:max-w-5xl max-w-full mr-12  basis-[100%] prose break-all">
          <Content>{postElement}</Content>
          <div className="mt-8">
            <Link
              className="hover:text-black text-gray-500 underline-offset-4 "
              href={"/blogs"}
            >
              cd..
            </Link>
          </div>
          <Comments />
        </div>
        {toc.length ? (
          <div
            className={`sticky max-w-[200px] top-[120px] mt-[120px] h-[calc(100vh-6rem-4.5rem-150px-120px)]`}
          >
            <div>
              <Toc data={toc} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PostDetail;
