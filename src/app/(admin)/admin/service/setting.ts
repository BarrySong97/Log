import { User } from "@/app/api/model";

/**
 * 更新头像
 */
export const updateAvatar = (avatar: string) => {
  return fetch("/api/setting/avatar", {
    body: JSON.stringify({ avatar }),
    method: "PUT",
  });
};

export const updateUserInfo = (data: Partial<User>) => {
  return fetch("/api/setting", {
    body: JSON.stringify(data),
    method: "PUT",
  });
};
