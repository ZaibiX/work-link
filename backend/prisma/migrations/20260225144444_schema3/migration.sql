/*
  Warnings:

  - A unique constraint covering the columns `[sequence]` on the table `Gig` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Gig" ADD COLUMN     "sequence" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Gig_sequence_key" ON "Gig"("sequence");
