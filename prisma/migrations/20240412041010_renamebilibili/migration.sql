/*
  Warnings:

  - You are about to drop the column `bilibli` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "bilibli",
ADD COLUMN     "bilibili" TEXT;
