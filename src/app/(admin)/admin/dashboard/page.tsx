import React, { FC } from "react";
export interface Props {
  height: number;
}
const Dashboard: FC<Props> = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold leading-9 text-default-foreground">
        仪表盘
      </h1>
    </div>
  );
};

export default Dashboard;
