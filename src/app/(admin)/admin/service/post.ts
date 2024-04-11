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

/**
 * 删除post
 */
export async function deletePost(id: number) {
  return fetch(`/api/posts/${id}`, { method: "DELETE" });
}

/**
 * 发布，撤销发布
 */
export async function publish(id: number, value: number) {
  return fetch(`/api/posts/${id}/publish`, {
    method: "POST",
    body: JSON.stringify({ value }),
  });
}

/**
 * 編輯post
 */

export async function editPost(id: string, body: CreatePost) {
  return fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}
