import { Post } from "@/app/api/model";
import { atom } from "jotai";
export type CreatePost = Omit<
  Post,
  "id" | "createdAt" | "updatedAt" | "textCount" | "tags"
> & { tagsId: string[] };
export const postAtom = atom<CreatePost>({
  cover: "",
  title: "",
  desc: "",
  content: "",
  tagsId: [],
});
