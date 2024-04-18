import { Post } from "@/app/api/model";
import React, { FC } from "react";
import parse, { domToReact } from "html-react-parser";
import Toc from "../blogs/[id]/components/toc";
import Content from "../blogs/[id]/components/content";
import { TOC } from "@/app/(admin)/admin/posts/new/atom";
import Link from "next/link";
export interface AboutProps {}
const About: FC<AboutProps> = async () => {
  const { data }: { data: Post } = await fetch(
    `${process.env.API_PATH}/api/posts/about`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());
  console.log(data);

  const postElement = parse(data.html, {
    replace(domNode) {
      const codeElement = domNode.children?.[0];

      if (domNode.name === "pre" && codeElement?.name === "code") {
        const lang = domNode.attribs?.class?.split("language-")[1];
        return <CodeBlock language={lang}>{domToReact([domNode])}</CodeBlock>;
      }
    },
  });
  const toc: TOC = JSON.parse(data?.toc ?? "[]");
  return (
    <div>
      <div className="blog-view mx-auto justify-center   relative flex min-h-[120px] ">
        <div className="max-w-5xl mr-12 pr-2 basis-[100%] prose break-all">
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

export default About;
