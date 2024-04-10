import { Project, Tag } from "@/app/api/model";

export async function getProjectList() {
  const { data } = await fetch("/api/projects").then((res) => res.json());
  return data as Promise<Project[]>;
}
/**
 *
 * @param name 创建
 * @returns
 */
export async function createProject(
  body: Omit<Project, "id" | "createdAt" | "updatedAt">
) {
  const { data } = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
  return data as Promise<Project>;
}

/**
 * 删除
 */
export async function deleteProject(id: number) {
  const { data } = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
  return data as Promise<void>;
}

/**
 * 更新
 */
export async function updateProject(
  body: Omit<Project, "id" | "createdAt" | "updatedAt">,
  id: string
) {
  const { data } = await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      ...body,
    }),
  }).then((res) => res.json());
  return data as Promise<Project>;
}
