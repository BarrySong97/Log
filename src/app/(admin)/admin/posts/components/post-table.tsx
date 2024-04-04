"use client";
import React, { FC, ReactNode, useState } from "react";
import AppTable from "@/app/(admin)/admin/components/AppTable/app-table";
import type { TableProps } from "antd";
import { Checkbox } from "@nextui-org/react";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export interface PostsProps {}
const PostTable: FC<PostsProps> = () => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
    },
    {
      title: "Action",
      key: "action",
    },
  ];
  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
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
      dataSource={data}
      columns={columns}
    />
  );
};

export default PostTable;
