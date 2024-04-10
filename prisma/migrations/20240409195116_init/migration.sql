/*
  Warnings:

  - Added the required column `homeAddress` to the `Admission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admission" ADD COLUMN     "homeAddress" TEXT NOT NULL;
