/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Classes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Classes" DROP CONSTRAINT "Classes_teacherId_fkey";

-- AlterTable
ALTER TABLE "Classes" DROP COLUMN "teacherId";
