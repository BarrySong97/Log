import {
  SolarBook2Broken,
  SolarEyeLinear,
  SolarMonitorSmartphoneOutline,
  SolarTextBold,
} from "@/assets/icon";
import { Card, CardBody } from "@nextui-org/react";
import React, { FC } from "react";
export interface Props {
  height: number;
}
const Dashboard: FC<Props> = () => {
  const statusNumber = [
    {
      title: "文章数",
      value: 10,
      icon: <SolarBook2Broken />,
    },
    {
      title: "项目数",
      value: 10,
      icon: <SolarMonitorSmartphoneOutline />,
    },
    {
      title: "文字数",
      value: 10000,
      icon: <SolarTextBold />,
    },
    {
      title: "浏览数",
      value: 10,
      icon: <SolarEyeLinear />,
    },
  ];
  return (
    <div>
      <h1 className="text-3xl mb-8 font-bold leading-9 text-default-foreground">
        仪表盘
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {statusNumber.map((v) => {
          return (
            <Card radius="sm" key={v.title} shadow="sm">
              <CardBody>
                <div className="mb-1 text-default-500 text-small  flex items-center gap-2">
                  <span className="text-large">{v.icon}</span>
                  {v.title}
                </div>
                <div className=" text-2xl font-medium">{v.value}</div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
