import { Post } from "@/app/api/model";
import { CreatePost } from "../posts/new/atom";

/**
 *
 * @param body 创建post
 * @returns
 */
export async function createPost(body: CreatePost) {
  return fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

/**
 * 获取postlist
 */
export async function getPostList() {
  const { data } = await fetch("/api/posts").then((res) => res.json());
  return data as Promise<Post[]>;
}
