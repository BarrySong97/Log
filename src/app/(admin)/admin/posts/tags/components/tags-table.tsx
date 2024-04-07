"use client";
import React, { FC, useState } from "react";
import AppTable from "@/app/(admin)/admin/components/AppTable/app-table";
import type { TableProps } from "antd";
import { Post } from "@/app/api/model";
import { Button } from "@nextui-org/react";
import { SolarAddSquareBold } from "@/assets/icon";
import EditTag from "./eidt-tag";

export interface PostsProps {
  page: number;
}
const TagsTable: FC<PostsProps> = ({ page }) => {
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
          创建Tag
        </Button>
      </div>

      <AppTable
        pagination={{
          total: 30,
          pageSize: 10,
          current: page ?? 1,
          onChange: (page, pageSize) => {},
        }}
        rowSelection={rowSelection}
        dataSource={[]}
        columns={columns}
      />
      <EditTag isOpen={modal} onOpenChange={setModal} />
    </>
  );
};

export default TagsTable;
