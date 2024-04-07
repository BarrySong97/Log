import bcrypt from "bcryptjs";
const saltRounds = 10;
// 加密密码
export const cryptPassword = async (password: string) => {
  const cryptPass = await bcrypt.hash(password, saltRounds);
  return cryptPass;
};

// 解密密码
export const plainPassword = async (password: string, hashPassword: string) => {
  return bcrypt.compare(password, hashPassword);
};
