/*
  Warnings:

  - Changed the type of `skillCategory` on the `WorkerProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SkillCategory" AS ENUM ('AC_TECHNICIAN', 'ELECTRICIAN', 'PLUMBER', 'SOLAR_EXPERT', 'PAINTER', 'CARPENTER', 'OTHER');

-- AlterTable
ALTER TABLE "WorkerProfile" DROP COLUMN "skillCategory",
ADD COLUMN     "skillCategory" "SkillCategory" NOT NULL;
