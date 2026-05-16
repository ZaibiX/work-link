/*
  Warnings:

  - You are about to drop the column `codeExpiresAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "codeExpiresAt",
ADD COLUMN     "verificationCodeExpiry" TIMESTAMP(3);
