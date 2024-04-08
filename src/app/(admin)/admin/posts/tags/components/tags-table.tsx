"use client";
import React, { FC, useState } from "react";
import AppTable from "@/app/(admin)/admin/components/AppTable/app-table";
import type { TableProps } from "antd";
import { Post, Tag } from "@/app/api/model";
import { Button } from "@nextui-org/react";
import { SolarAddSquareBold } from "@/assets/icon";
import EditTag from "./eidt-tag";
import { getTagList } from "../../../service/tag";
import { useRequest } from "ahooks";
import dayjs from "dayjs";

export interface PostsProps {
  page: number;
}
const TagsTable: FC<PostsProps> = ({ page }) => {
  const columns: TableProps<Tag>["columns"] = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "创建日期",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        return dayjs(createdAt).format("YYYY-MM-DD HH:mm");
      },
    },
    {
      title: "更新日期",
      key: "updatedAt",
      dataIndex: "updatedAt",
      render: (text) => {
        return dayjs(text).format("YYYY-MM-DD HH:mm");
      },
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
  const { data, loading } = useRequest(() => getTagList());

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
          total: data?.length ?? 0,
          pageSize: 10,
          current: page ?? 1,
        }}
        rowKey={"id"}
        loading={loading}
        rowSelection={rowSelection}
        dataSource={data?.slice(10 * (page - 1), page * 10)}
        columns={columns}
      />
      <EditTag isOpen={modal} onOpenChange={setModal} />
    </>
  );
};

export default TagsTable;
