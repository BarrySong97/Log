import React, { FC } from "react";
import PostEditor from "./components/post-editor";
import "./prosemirror.css";
import PostMeta from "./components/post-meta";
export interface EditPost {}
const EditPost: FC<EditPost> = () => {
  return (
    <div className="flex gap-4">
      <PostEditor />
      <div className="flex-1 flex flex-col gap-4">
        <PostMeta />
      </div>
    </div>
  );
};

export default EditPost;
