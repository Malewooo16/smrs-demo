/*
  Warnings:

  - Added the required column `phoneNumber` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "phoneNumber" TEXT NOT NULL;
