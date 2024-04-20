import { Post } from "@/app/api/model";
import React, { FC } from "react";
import PostDetail from "../blogs/[id]/components/post";
import { Metadata } from "next";
import { seo } from "@/app/seo";
export interface AboutProps {}
export const metadata: Metadata = {
  title: "关于 - Barry Song's 小宇宙",
  description: "关于Barry Song是一个怎么样的人",
  openGraph: {
    title: {
      default: "Barry Song's Blog",
      template: "%s | Barry Song的小宇宙",
    },
    description: "探索宇宙，永葆青春",
    siteName: "Barry Song's Blog",
    locale: "zh_CN",
    type: "website",
    url: "https://www.barrysong4real.cc/",
  },
  twitter: {
    ...seo.twitter,
  },
};
const About: FC<AboutProps> = async () => {
  const { data }: { data: Post } = await fetch(
    `${process.env.API_PATH}/api/posts/about`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  return (
    <div className=" w-full py-8 pt-10 px-4  relative lg:px-16 z-50">
      <PostDetail data={data} />
    </div>
  );
};

export default About;
