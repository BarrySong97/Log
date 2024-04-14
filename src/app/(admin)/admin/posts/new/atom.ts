import { Post } from "@/app/api/model";
import { atom } from "jotai";
export type TOC = Array<{ text: string; level: number; id: string }>;
export type CreatePost = Omit<
  Post,
  "id" | "createdAt" | "updatedAt" | "tags"
> & { tagsId: string[]; html?: string; toc: TOC };
const defaultValue = {
  type: "doc",
  content: [],
};
export const postAtom = atom<CreatePost>({
  cover: "",
  published: false,
  title: "",
  html: "",
  desc: "",
  toc: [],
  textCount: 0,
  content: "",
  tagsId: [],
});
