import { Post } from "@/app/api/model";
import { atom } from "jotai";
export type CreatePost = Omit<
  Post,
  "id" | "createdAt" | "updatedAt" | "tags"
> & { tagsId: string[] };
const defaultValue = {
  type: "doc",
  content: [],
};
export const postAtom = atom<CreatePost>({
  cover: "",
  published: false,
  title: "",
  desc: "",
  textCount: 0,
  content: "",
  tagsId: [],
});
