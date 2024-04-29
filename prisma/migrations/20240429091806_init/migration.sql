/*
  Warnings:

  - The `activeAdmissionClasses` column on the `School` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "School" DROP COLUMN "activeAdmissionClasses",
ADD COLUMN     "activeAdmissionClasses" JSONB[] DEFAULT ARRAY[]::JSONB[];
