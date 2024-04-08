import { Tag } from "@/app/api/model";

export async function getTagList() {
  const { data } = await fetch("/api/tags").then((res) => res.json());
  return data as Promise<Tag[]>;
}
/**
 *
 * @param name 创建
 * @returns
 */
export async function createTag(title: string) {
  const { data } = await fetch("/api/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  }).then((res) => res.json());
  return data as Promise<Tag>;
}

/**
 * 删除
 */
export async function deleteTag(id: number) {
  const { data } = await fetch(`/api/tags/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
  return data as Promise<void>;
}

/**
 * 更新
 */
export async function updateTag(id: string, title: string) {
  const { data } = await fetch(`/api/tags/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  }).then((res) => res.json());
  return data as Promise<void>;
}
