import Link from "next/link";
import Image from "next/image";
import React, { FC } from "react";
export interface ProjectsProps {}
const Projects: FC<ProjectsProps> = () => {
  const projects = [
    {
      name: "Log",
      description: "个人博客",
      href: "",
      logo: "/xiaohongshu.ico",
    },
    {
      name: "ChatA",
      description: "主流大模型webui",
      href: "twitter.3.ico",
      logo: "/twitter.3.ico",
    },
  ];
  return (
    <div className="scrollElement grid grid-cols-3 gap-4 max-w-5xl  w-full py-8 pb-4  px-16">
      {projects.map((v) => {
        return (
          <Link
            key={v.name}
            href={v.href}
            target="blank"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <div className="mb-2">
              <Image
                src={v.logo}
                height={32}
                width={32}
                alt={`${v.name}-logo`}
              />
            </div>
            <h2 className={`mb-3 text-large font-semibold`}>
              {v.name}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              {v.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default Projects;
