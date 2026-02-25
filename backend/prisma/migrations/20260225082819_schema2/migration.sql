/*
  Warnings:

  - Added the required column `address` to the `Gig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Gig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `WorkerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gig" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "lat" DOUBLE PRECISION,
ADD COLUMN     "lng" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "WorkerProfile" ADD COLUMN     "country" TEXT NOT NULL;
