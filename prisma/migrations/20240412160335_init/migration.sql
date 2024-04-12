/*
  Warnings:

  - The `admissionStatus` column on the `School` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "School" ADD COLUMN     "admissionDates" JSONB,
DROP COLUMN "admissionStatus",
ADD COLUMN     "admissionStatus" BOOLEAN DEFAULT false;
