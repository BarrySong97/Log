import React, { FC } from "react";
import ProjectTable from "./components/project-table";
import { Metadata } from "next";
export interface ProjectsProps {}
export const metadata: Metadata = {
  title: "项目管理 - Barry Song's 小宇宙",
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
};
const Projects: FC<ProjectsProps> = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold leading-9 text-default-foreground mb-8">
        项目
      </h1>
      <div className="flex flex-col items-center">
        <ProjectTable />
      </div>
    </div>
  );
};

export default Projects;
