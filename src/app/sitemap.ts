import { type MetadataRoute } from "next";

import { Post } from "./api/model";
export function url(path = "") {
  const baseUrl = process.env.API_PATH;

  return new URL(path, baseUrl);
}
export default async function sitemap() {
  const staticMap = [
    {
      url: url("/").href,
      lastModified: new Date(),
    },
    {
      url: url("/blogs").href,
      lastModified: new Date(),
    },
    {
      url: url("/projects").href,
      lastModified: new Date(),
    },
    {
      url: url("/about").href,
      lastModified: new Date(),
    },
  ] satisfies MetadataRoute.Sitemap;

  const { data }: { data: Post[] } = await fetch(
    `${process.env.API_PATH}/api/posts?published=1`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  const dynamicMap = data?.map((slug) => ({
    url: url(`/blog/${slug.id}`).href,
    lastModified: new Date(),
  })) satisfies MetadataRoute.Sitemap;

  return [...staticMap, ...dynamicMap];
}

export const runtime = "edge";
export const revalidate = 60;
