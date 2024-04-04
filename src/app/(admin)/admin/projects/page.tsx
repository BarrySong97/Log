import React, { FC } from "react";
export interface ProjectsProps {}
const Projects: FC<ProjectsProps> = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold leading-9 text-default-foreground">
        项目
      </h1>
    </div>
  );
};

export default Projects;
