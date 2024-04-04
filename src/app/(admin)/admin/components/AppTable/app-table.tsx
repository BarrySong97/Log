"use client";
import React, { FC, ReactNode } from "react";
import "./index.css";
import { Table } from "antd";
import type { TableProps } from "antd";
import { Checkbox, Pagination } from "@nextui-org/react";

export type AppTableProps = TableProps;
const AppTable: FC<AppTableProps> = ({
  columns,
  dataSource,
  rowSelection,
  pagination,
  ...props
}) => {
  const { onHeaderRow } = props;
  console.log(pagination);

  return (
    <div className="p-4 z-0 flex items-center flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small w-full">
      <Table
        pagination={false}
        onHeaderRow={(headerRowProps) => {
          const originalHeaderRow = onHeaderRow?.(headerRowProps);

          // 创建一个新的对象，包含原有的属性和自定义样式
          const customHeaderRow = {
            ...originalHeaderRow,
            className: `${
              originalHeaderRow?.className
                ? originalHeaderRow.className + " "
                : ""
            }group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2`,
          };

          // 返回新的自定义 headerRow 对象
          return customHeaderRow;
        }}
        className="w-full"
        columns={columns}
        dataSource={dataSource}
        rowSelection={{
          ...(rowSelection ?? {}),
          columnTitle: (node: ReactNode) => {
            return (
              <Checkbox
                isIndeterminate={node?.props?.indeterminate}
                onChange={node?.props?.onChange}
                color="default"
                className="pr-0"
                isSelected={node?.props?.checked}
                size="md"
                radius="md"
              ></Checkbox>
            );
          },
          renderCell: (
            _checked: boolean,
            _record: any,
            _index: number,
            node: ReactNode
          ) => {
            return (
              <Checkbox
                onChange={node?.props?.onChange}
                onClick={node?.props?.onClick}
                className="pr-0 "
                color="default"
                isSelected={node?.props?.checked}
                size="md"
                radius="md"
              ></Checkbox>
            );
          },
        }}
        {...props}
      />
      {pagination ? (
        <Pagination
          className="mt-1"
          showControls
          total={Math.round(
            (pagination?.total ?? 0) / (pagination?.pageSize ?? 10)
          )}
          initialPage={1}
          onChange={(p) => pagination?.onChange?.(p, pagination.pageSize ?? 10)}
          page={pagination.current}
        />
      ) : null}
    </div>
  );
};

export default AppTable;
