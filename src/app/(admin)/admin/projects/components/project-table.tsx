"use client";
import React, { FC, useState } from "react";
import AppTable from "@/app/(admin)/admin/components/AppTable/app-table";
import { Popconfirm, message, type TableProps } from "antd";
import { Project } from "@/app/api/model";
import { Button, Link, LinkIcon } from "@nextui-org/react";
import { SolarAddSquareBold } from "@/assets/icon";
import EditProject from "./eidt-project";
import { useQuery, useQueryClient } from "react-query";
import { deleteProject, getProjectList } from "../../service/project";
import dayjs from "dayjs";

export interface PostsProps {}
const ProjectTable: FC<PostsProps> = () => {
  const [focusRow, setFocusRow] = useState<Project>();
  const queryClient = useQueryClient();
  const columns: TableProps<Project>["columns"] = [
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      render: (icon) => {
        return <img src={icon} alt="icon" width="32px" height="32px" />;
      },
    },
    {
      title: "名称",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "描述",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "链接",
      dataIndex: "link",
      key: "link",
      render: (link) => {
        return (
          <Link size="sm" underline="hover" href={link}>
            {link}
          </Link>
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
            <Link
              onClick={() => {
                setFocusRow({ ...record });
                setModal(true);
              }}
              color="primary"
              size="sm"
            >
              编辑
            </Link>
            <Popconfirm
              title="删除Project"
              description="确认删除该Project吗？"
              onConfirm={async () => {
                try {
                  await deleteProject(record.id);
                  queryClient.setQueryData<Project[]>(
                    "projects",
                    (data: Project[] | undefined) => {
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
    onChange: (selectedRowKeys: React.Key[], selectedRows: Project[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  const [modal, setModal] = useState(false);
  const { data, isLoading: loading } = useQuery<Project[]>("projects", {
    queryFn: () => getProjectList(),
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
          创建项目
        </Button>
      </div>
      <AppTable
        rowSelection={rowSelection}
        dataSource={data}
        rowKey={"id"}
        key={JSON.stringify(data)}
        loading={loading}
        columns={columns}
      />
      <EditProject data={focusRow} isOpen={modal} onOpenChange={setModal} />
    </>
  );
};

export default ProjectTable;
