"use client";
import React, { FC, useState } from "react";
import {
  Button,
  Checkbox,
  Image,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useAtom } from "jotai";
import { CreatePost, postAtom } from "../atom";
import { Form, message } from "antd";
import { useQuery } from "react-query";
import { Tag } from "@/app/api/model";
import { getTagList } from "../../../service/tag";
import ImageUplod from "@/components/image-upload";
import { createPost } from "../../../service/post";
export interface PostMetaProps {}
export const animals = [
  {
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    value: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    value: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
  {
    label: "Giraffe",
    value: "giraffe",
    description: "The tallest land animal",
  },
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {
    label: "Penguin",
    value: "penguin",
    description: "A group of aquatic flightless birds",
  },
  {
    label: "Zebra",
    value: "zebra",
    description: "A several species of African equids",
  },
  {
    label: "Shark",
    value: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {
    label: "Otter",
    value: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae",
  },
  {
    label: "Crocodile",
    value: "crocodile",
    description: "A large semiaquatic reptile",
  },
];
const PostMeta: FC<PostMetaProps> = () => {
  const [post] = useAtom(postAtom);
  const [createLoading, setCreateLoading] = useState(false);
  const { data, isLoading: loading } = useQuery<Tag[]>("tags", {
    queryFn: () => getTagList(),
  });
  return (
    <>
      <div className="text-sm font-semibold ">文章信息</div>
      <Form<CreatePost>
        onFinish={async (values) => {
          values.tagsId = Array.from(values.tagsId);
          setCreateLoading(true);
          try {
            const requestBody = {
              ...values,
              content: post.content,
              textCount: post.textCount,
              desc: !values.desc ? post.desc : values.desc,
            };
            await createPost(requestBody);
            message.success("创建成功");
          } catch (error) {
            message.error("创建失败");
          } finally {
            setCreateLoading(false);
          }
        }}
      >
        <div className="flex justify-between items-end gap-4">
          <Form.Item>
            <Button isLoading={createLoading} type="submit" color="primary">
              创建
            </Button>
          </Form.Item>
          <Form.Item noStyle name="published">
            <Checkbox className="mb-4" color="primary">
              发布
            </Checkbox>
          </Form.Item>
          {/* <Button color="danger">删除</Button> */}
        </div>
        <Form.Item noStyle name="cover">
          <ImageUplod text="上传封面" imageType="cover" />
        </Form.Item>
        <Form.Item noStyle name="title">
          <Input
            label="文章标题"
            placeholder="请输入文章标题"
            isRequired
            radius="sm"
            size="sm"
            className="mb-4"
            variant="flat"
          />
        </Form.Item>
        <Form.Item
          trigger="onSelectionChange"
          valuePropName="selectedKeys"
          noStyle
          name="tagsId"
        >
          <Select
            label="选择标签"
            selectionMode="multiple"
            isLoading={loading}
            placeholder="请选择标签"
            className="max-w-xs mb-4"
          >
            {data?.map((tag) => (
              <SelectItem key={tag.id} value={tag.title}>
                {tag.title}
              </SelectItem>
            )) ?? []}
          </Select>
        </Form.Item>
        <Form.Item noStyle name="desc">
          <Textarea label="简介" radius="sm" size="sm" variant="flat" />
        </Form.Item>
      </Form>
      <div className="text-sm font-semibold ">目录</div>
    </>
  );
};

export default PostMeta;
