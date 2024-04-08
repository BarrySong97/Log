"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function signInAction(data: FormData) {
  const res = await signIn("credentials", {
    username: data.get("username"),
    password: data.get("password"),
    redirectTo: "/admin/dashboard",
  });
}
