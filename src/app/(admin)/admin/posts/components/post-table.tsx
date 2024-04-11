"use client";
import React, { FC, useState } from "react";
import AppTable from "@/app/(admin)/admin/components/AppTable/app-table";
import type { TableProps } from "antd";
import { Post } from "@/app/api/model";
import { Button } from "@nextui-org/react";
import { SolarAddSquareBold } from "@/assets/icon";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { getPostList } from "../../service/post";

export interface PostsProps {
  page: number;
}
const PostTable: FC<PostsProps> = ({ page }) => {
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
  const router = useRouter();
  const { data, isLoading: loading } = useQuery<Post[]>("posts", {
    queryFn: () => getPostList(),
  });
  return (
    <>
      <div className="self-start mb-5">
        <Button
          color="primary"
          as={"a"}
          onClick={() => {
            router.push("/admin/posts/new");
          }}
          radius="sm"
          startContent={<SolarAddSquareBold className="text-large" />}
        >
          创建文章
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
    </>
  );
};

export default PostTable;
