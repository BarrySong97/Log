"use client";
import React, { FC, useState } from "react";
import AppTable from "@/app/(admin)/admin/components/AppTable/app-table";
import { Popconfirm, message, type TableProps } from "antd";
import { Post, Tag } from "@/app/api/model";
import { Button, Image, Link } from "@nextui-org/react";
import { SolarAddSquareBold } from "@/assets/icon";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "react-query";
import { deletePost, getPostList } from "../../service/post";
import dayjs from "dayjs";

export interface PostsProps {
  page: number;
}
const PostTable: FC<PostsProps> = ({ page }) => {
  const queryClient = useQueryClient();
  const columns: TableProps<Post>["columns"] = [
    {
      title: "封面",
      dataIndex: "cover",
      key: "cover",
      width: 150,
      render: (cover) => {
        return <Image src={cover} alt="cover" width={130} />;
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tag",
      dataIndex: "tags",
      key: "tags",
      render: (tags: Tag[]) => {
        return tags?.map((item, index) => {
          return (
            <span>
              #{item.title}
              {index !== tags.length - 1 ? ", " : ""}
            </span>
          );
        });
      },
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
      render: (record) => {
        return (
          <div className="flex gap-2">
            <Link onClick={() => {}} color="primary" size="sm">
              编辑
            </Link>
            <Popconfirm
              title="删除Taf"
              description="确认删除该Tag吗？"
              onConfirm={async () => {
                try {
                  await deletePost(record.id);
                  queryClient.setQueryData<Post[]>(
                    "posts",
                    (data: Post[] | undefined) => {
                      return (
                        data?.filter((item) => item.id !== record.id) ?? []
                      );
                    }
                  );
                  message.success("删除成功");
                } catch (error) {
                  message.error("删除失败");
                }
              }}
              okText="确认"
              cancelText="取消"
            >
              <Link color="danger" size="sm">
                删除
              </Link>
            </Popconfirm>
          </div>
        );
      },
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
