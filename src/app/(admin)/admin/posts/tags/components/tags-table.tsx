"use client";
import React, { FC, useState } from "react";
import AppTable from "@/app/(admin)/admin/components/AppTable/app-table";
import { Popconfirm, message, type TableProps } from "antd";
import { Post, Tag } from "@/app/api/model";
import { Button, Link } from "@nextui-org/react";
import { SolarAddSquareBold } from "@/assets/icon";
import EditTag from "./eidt-tag";
import { deleteTag, getTagList } from "../../../service/tag";
import dayjs from "dayjs";
import { useQuery, useQueryClient } from "react-query";

export interface PostsProps {
  page: number;
}
const TagsTable: FC<PostsProps> = ({ page }) => {
  const [focusRow, setFocusRow] = useState<Tag>();
  const queryClient = useQueryClient();
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
      render: (record) => {
        return (
          <div className="flex gap-2">
            <Link
              onClick={() => {
                setFocusRow(record);
                setModal(true);
              }}
              color="primary"
              size="sm"
            >
              编辑
            </Link>
            <Popconfirm
              title="删除Taf"
              description="确认删除该Tag吗？"
              onConfirm={async () => {
                try {
                  await deleteTag(record.id);
                  queryClient.setQueryData<Tag[]>(
                    "tags",
                    (data: Tag[] | undefined) => {
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
  const [modal, setModal] = useState(false);
  const { data, isLoading: loading } = useQuery<Tag[]>("tags", {
    queryFn: () => getTagList(),
  });

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
      <EditTag data={focusRow} isOpen={modal} onOpenChange={setModal} />
    </>
  );
};

export default TagsTable;
