"use client";
import React, { FC, useState } from "react";
import AppTable from "@/app/(admin)/admin/components/AppTable/app-table";
import type { TableProps } from "antd";
import { Post } from "@/app/api/model";

export interface PostsProps {
  searchParams: { page: number };
}
const TagsTable: FC<PostsProps> = ({ searchParams }) => {
  const page = Number(searchParams.page) || 1;
  const columns: TableProps<Post>["columns"] = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
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
    onChange: (selectedRowKeys: React.Key[], selectedRows: Post[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  return (
    <AppTable
      pagination={{
        total: 30,
        pageSize: 10,
        current: page,
        onChange: (page, pageSize) => {},
      }}
      rowSelection={rowSelection}
      dataSource={[]}
      columns={columns}
    />
  );
};

export default TagsTable;
