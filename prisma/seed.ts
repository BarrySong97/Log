import { cryptPassword } from "../src/app/api/auth/salt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const password = await cryptPassword(process.env.ADMIN_PASSWORD || "admin");

  const admin = await prisma.user.upsert({
    where: { email: "524000659@qq.com" },
    update: {},
    create: {
      email: "524000659@qq.com",
      name: "BarrySong",
      password,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
