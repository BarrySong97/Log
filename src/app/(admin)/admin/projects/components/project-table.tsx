"use client";
import React, { FC, useState } from "react";
import AppTable from "@/app/(admin)/admin/components/AppTable/app-table";
import { type TableProps } from "antd";
import { Project } from "@/app/api/model";
import { Button } from "@nextui-org/react";
import { SolarAddSquareBold } from "@/assets/icon";
import EditProject from "./eidt-project";

export interface PostsProps {}
const ProjectTable: FC<PostsProps> = () => {
  const columns: TableProps<Project>["columns"] = [
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
    },
    {
      title: "名称",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "链接",
      dataIndex: "link",
      key: "link",
    },
    {
      title: "创建日期",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "更新日期",
      key: "updatedAt",
      dataIndex: "updatedAt",
    },
    {
      title: "操作",
      key: "action",
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: Project[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="self-start mb-5">
        <Button
          color="primary"
          onClick={() => {
            setModal(true);
          }}
          radius="sm"
          startContent={<SolarAddSquareBold className="text-large" />}
        >
          创建项目
        </Button>
      </div>
      <AppTable
        pagination={{
          total: 30,
          pageSize: 10,
          current: 1,
        }}
        rowSelection={rowSelection}
        dataSource={[]}
        columns={columns}
      />
      <EditProject isOpen={modal} onOpenChange={setModal} />
    </>
  );
};

export default ProjectTable;
