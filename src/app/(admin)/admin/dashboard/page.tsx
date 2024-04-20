import { DashBoardData } from "@/app/api/model";
import {
  SolarBook2Broken,
  SolarEyeLinear,
  SolarMonitorSmartphoneOutline,
  SolarTextBold,
} from "@/assets/icon";
import { Card, CardBody } from "@nextui-org/react";
import { Metadata } from "next";
import React, { FC } from "react";
export interface Props {}
export const metadata: Metadata = {
  title: "Dashboard - Barry Song's 小宇宙",
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
const Dashboard: FC<Props> = async () => {
  const { data }: { data: DashBoardData } = await fetch(
    `${process.env.API_PATH}/api/dashboard`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  const statusNumber = [
    {
      title: "文章数",
      value: data.postCount,
      icon: <SolarBook2Broken />,
    },
    {
      title: "项目数",
      value: data.projectCount,
      icon: <SolarMonitorSmartphoneOutline />,
    },
    {
      title: "文字数",
      value: data.textCount ?? 0,
      icon: <SolarTextBold />,
    },
    {
      title: "浏览数",
      value: 0,
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
