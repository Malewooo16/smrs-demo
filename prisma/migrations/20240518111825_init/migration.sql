/*
  Warnings:

  - You are about to drop the column `scores` on the `StudentT` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentT" DROP COLUMN "scores",
ADD COLUMN     "results" JSONB[];
