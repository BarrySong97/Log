import { Post } from "@/app/api/model";
import React, { FC } from "react";
import PostDetail from "../blogs/[id]/components/post";
export interface AboutProps {}
const About: FC<AboutProps> = async () => {
  const { data }: { data: Post } = await fetch(
    `${process.env.API_PATH}/api/posts/about`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());
  console.log(data);

  return (
    <div className=" w-full py-8 pt-10   relative px-16 z-50">
      <PostDetail data={data} />
    </div>
  );
};

export default About;
