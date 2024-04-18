import React, { FC } from "react";
import PostEditor from "../new/components/post-editor";
import "./prosemirror.css";
import "./uploader.css";
import PostMeta from "../new/components/post-meta";
export const dynamic = "auto";
export const revalidate = 0;
export interface EditPost {
  params: { id: string };
}
const EditPost: FC<EditPost> = async ({ params }) => {
  const { id } = params;
  const { data } = await fetch(`${process.env.API_PATH}/api/posts/${id}`).then(
    (v) => v.json()
  );

  return (
    <div className="flex gap-4 h-full">
      <PostEditor data={data} />
      <div className="flex-1 flex flex-col gap-4">
        <PostMeta data={data} />
      </div>
    </div>
  );
};

export default EditPost;
