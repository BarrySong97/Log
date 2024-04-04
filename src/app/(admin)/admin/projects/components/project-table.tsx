"use client";
import React, { FC, useState } from "react";
import AppTable from "@/app/(admin)/admin/components/AppTable/app-table";
import type { TableProps } from "antd";
import { Project } from "@/app/api/model";

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
  return (
    <AppTable
      pagination={{
        total: 30,

        pageSize: 10,
        current: 1,
        onChange: (page, pageSize) => {
          console.log(22);
        },
      }}
      rowSelection={rowSelection}
      dataSource={[]}
      columns={columns}
    />
  );
};

export default ProjectTable;
