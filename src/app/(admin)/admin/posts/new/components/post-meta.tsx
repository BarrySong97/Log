"use client";
import React, { FC, useEffect, useState } from "react";
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
import { Post, Tag } from "@/app/api/model";
import { getTagList } from "../../../service/tag";
import ImageUplod from "@/components/image-upload";
import { createPost, editPost } from "../../../service/post";
import { useRouter } from "next/navigation";
import { useForm } from "antd/es/form/Form";
import Link from "next/link";
import { compositionHighlightCode } from "../util";
export interface PostMetaProps {
  data?: Post;
}
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
const PostMeta: FC<PostMetaProps> = ({ data }) => {
  const [post, setPost] = useAtom(postAtom);
  const [createLoading, setCreateLoading] = useState(false);
  const { data: tags, isLoading: loading } = useQuery<Tag[]>("tags", {
    queryFn: () => getTagList(),
  });
  const router = useRouter();
  const [form] = useForm();
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title,
        desc: data.desc,
        published: data.published,

        cover: data.cover,
        tagsId: data.tags.map((v) => v.id),
      });
      setPost({
        ...post,
        toc: JSON.parse(data.toc ?? "[]"),
      });
    }
  }, [data]);
  return (
    <div className="w-[300px]">
      <div className="text-sm font-semibold mb-4">文章信息</div>
      <Form<CreatePost>
        onFinish={async (values) => {
          values.tagsId = Array.from(values.tagsId);
          setCreateLoading(true);
          try {
            const highlight = await compositionHighlightCode(post.html);
            const requestBody = {
              ...values,
              content: post.content,
              html: highlight,
              textCount: post.textCount,
              toc: JSON.stringify(post.toc),
              desc: !values.desc ? post.desc : values.desc,
            };

            if (data) {
              await editPost(data.id, requestBody as any as CreatePost);
              message.success("更新成功");
            } else {
              await createPost(requestBody as any as CreatePost);
              message.success("创建成功");
            }
            router.push("/admin/posts");
            setPost({
              cover: "",
              published: false,
              title: "",
              desc: "",
              textCount: 0,
              about: false,
              content: "",
              html: "",
              toc: [] as any,
              tagsId: [],
            });
          } catch (error) {
            message.error("创建失败");
          } finally {
            setCreateLoading(false);
          }
        }}
        form={form}
      >
        <div className="flex justify-between items-end gap-4">
          <Form.Item>
            <Button isLoading={createLoading} type="submit" color="primary">
              {data ? "更新" : "创建"}
            </Button>
          </Form.Item>
          <div className="flex gap-2">
            <Form.Item
              trigger="onValueChange"
              valuePropName="isSelected"
              noStyle
              name="about"
            >
              <Checkbox className="mb-4" color="primary">
                关于我
              </Checkbox>
            </Form.Item>
            <Form.Item
              trigger="onValueChange"
              valuePropName="isSelected"
              noStyle
              name="published"
            >
              <Checkbox className="mb-4" color="primary">
                发布
              </Checkbox>
            </Form.Item>
          </div>
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
            {tags?.map((tag) => (
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
      <div className="text-sm font-semibold mt-4 mb-4">目录</div>
      <div>
        {post?.toc?.map((item) => (
          <div key={item.text} className="flex text-sm items-center gap-2">
            <a
              href={`#${item.id}`}
              className="mb-2"
              onClick={() => {
                router.replace(`#${item.id}`);
              }}
              style={{
                marginLeft: (item.level - 1) * 10,
              }}
            >
              {item.text}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PostMeta;
