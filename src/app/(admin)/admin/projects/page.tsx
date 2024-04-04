import React, { FC } from "react";
import ProjectTable from "./components/project-table";
export interface ProjectsProps {}
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
