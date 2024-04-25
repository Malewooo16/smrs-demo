/*
  Warnings:

  - You are about to drop the column `activeClasses` on the `AdmissionStatus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AdmissionStatus" DROP COLUMN "activeClasses",
ADD COLUMN     "selectedClass" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "activeAdmissionClasses" TEXT[] DEFAULT ARRAY[]::TEXT[];
