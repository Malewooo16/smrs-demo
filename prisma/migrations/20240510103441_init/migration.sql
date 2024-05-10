/*
  Warnings:

  - The `score` column on the `CourseEnrollment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CourseEnrollment" DROP COLUMN "score",
ADD COLUMN     "score" JSONB;
