import { CreatePost } from "../posts/new/atom";

export async function createPost(body: CreatePost) {
  return await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
