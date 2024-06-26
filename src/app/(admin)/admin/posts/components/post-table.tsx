"use client";
import React, { FC, useState } from "react";
import AppTable from "@/app/(admin)/admin/components/AppTable/app-table";
import { Popconfirm, message, type TableProps } from "antd";
import { Post, Tag } from "@/app/api/model";
import { Button, Chip, Image, Link } from "@nextui-org/react";
import { SolarAddSquareBold } from "@/assets/icon";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "react-query";
import { deletePost, getPostList, publish } from "../../service/post";
import dayjs from "dayjs";

export interface PostsProps {
  page: number;
}
const PostTable: FC<PostsProps> = ({ page }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const columns: TableProps<Post>["columns"] = [
    {
      title: "封面",
      dataIndex: "cover",
      key: "cover",
      width: 150,
      render: (cover) => {
        return (
          <img
            src={cover ?? "/default-cover.png"}
            alt="cover"
            width={130}
            height={150}
            className="h-[80px] w-[170px] object-cover rounded-md"
          />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      render: (_, record) => {
        return (
          <Link target="_blank" href={`/blogs/${record.id}`} size="sm">
            {record.title}
          </Link>
        );
      },
    },
    {
      title: "Tag",
      dataIndex: "tags",
      key: "tags",
      render: (tags: Tag[]) => {
        return tags?.map((item, index) => {
          return (
            <span key={item.id}>
              #{item.title}
              {index !== tags.length - 1 ? ", " : ""}
            </span>
          );
        });
      },
    },
    {
      title: "状态",
      dataIndex: "published",
      key: "published",
      render: (published) => {
        return published ? (
          <Chip color="primary">已发布</Chip>
        ) : (
          <Chip color="warning">草稿</Chip>
        );
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
            {record.published ? (
              <Popconfirm
                title="撤销发布文章"
                description="确认撤销发布文章吗？"
                onConfirm={async () => {
                  try {
                    await publish(record.id, 0);
                    message.success("撤销发布成功");
                    queryClient.setQueryData<Post[]>(
                      "posts",
                      (data: Post[] | undefined) => {
                        data?.forEach((item) => {
                          if (item.id === record.id) {
                            item.published = false;
                          }
                        });
                        return data ?? [];
                      }
                    );
                  } catch (error) {}
                }}
                okText="确认"
                cancelText="取消"
              >
                <Link size="sm">撤销发布</Link>
              </Popconfirm>
            ) : (
              <Popconfirm
                title="发布文章"
                description="确认发布文章吗？"
                onConfirm={async () => {
                  try {
                    await publish(record.id, 1);
                    queryClient.setQueryData<Post[]>(
                      "posts",
                      (data: Post[] | undefined) => {
                        data?.forEach((item) => {
                          if (item.id === record.id) {
                            item.published = true;
                          }
                        });
                        return data ?? [];
                      }
                    );
                    message.success("发布成功");
                  } catch (error) {}
                }}
                okText="确认"
                cancelText="取消"
              >
                <Link color="primary" size="sm">
                  发布
                </Link>
              </Popconfirm>
            )}
            <a
              href={`/admin/posts/${record.id}`}
              target="_blank"
              color="primary"
            >
              编辑
            </a>
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
        virtual={true}
        pagination={{
          total: data?.length ?? 0,
          pageSize: 10,
          current: page ?? 1,
        }}
        scroll={{
          y: 600,
          x: 800,
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
