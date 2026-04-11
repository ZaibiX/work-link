-- CreateEnum
CREATE TYPE "AuthStrategy" AS ENUM ('LOCAL', 'GOOGLE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authStrategy" "AuthStrategy" NOT NULL DEFAULT 'LOCAL';

-- AlterTable
ALTER TABLE "WorkerProfile" ADD COLUMN     "allowedGigs" INTEGER NOT NULL DEFAULT 3;
