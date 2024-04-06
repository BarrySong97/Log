"use client";
import React, { FC } from "react";
import { Image, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
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
  return (
    <>
      <h4 className="text-sm font-semibold ">文章信息</h4>
      <Image
        isBlurred
        src="https://cdn.sanity.io/images/i81ys0da/production/e1785404ce160170a8cb0964cd982d6d4ee113d3-1200x675.png"
        alt="NextUI Album Cover"
        className="w-full object-cover"
      />
      <Input
        label="文章标题"
        placeholder="请输入文章标题"
        isRequired
        radius="sm"
        size="sm"
        variant="flat"
      />
      <Select
        label="选择标签"
        selectionMode="multiple"
        placeholder="请选择标签"
        className="max-w-xs"
      >
        {animals.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      <Textarea
        className="flex-1 "
        label="简介"
        radius="sm"
        size="sm"
        variant="flat"
      />
    </>
  );
};

export default PostMeta;
