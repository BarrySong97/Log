import Link from "next/link";
import React, { FC } from "react";
import { Project } from "@/app/api/model";
import { Image } from "@nextui-org/react";
import { Metadata } from "next";
import { seo } from "@/app/seo";
export const metadata: Metadata = {
  title: "项目 - Barry's Blog",
  description: "这些年我做过的项目",
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
export interface ProjectsProps {}
const Projects: FC<ProjectsProps> = async () => {
  const { data }: { data: Project[] } = await fetch(
    `${process.env.API_PATH}/api/projects`
  ).then((res) => res.json());

  return (
    <div className="scrollElement grid lg:grid-cols-3 grid-cols-2 gap-4 max-w-5xl  w-full py-8 pb-4  px-4 lg:px-16">
      {data?.map((v) => {
        return (
          <Link
            key={v.id}
            href={v.link}
            target="blank"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <div className="mb-2">
              <Image
                radius="none"
                src={v.icon}
                height={32}
                width={32}
                alt={`${v.title}-logo`}
              />
            </div>
            <h2 className={`mb-3 text-large font-semibold`}>
              {v.title}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{v.desc}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Projects;
