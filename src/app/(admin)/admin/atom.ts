import { atom } from "jotai";
import type { User as UserType } from "@/app/api/model";
export const userAtom = atom<UserType | null>(null);
