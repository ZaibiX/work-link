/*
  Warnings:

  - You are about to drop the column `address` on the `Gig` table. All the data in the column will be lost.
  - Added the required column `area` to the `Gig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gig" DROP COLUMN "address",
ADD COLUMN     "area" TEXT NOT NULL;
