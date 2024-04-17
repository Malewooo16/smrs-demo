/*
  Warnings:

  - You are about to drop the column `admissionClass` on the `Admission` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Admission` table. All the data in the column will be lost.
  - You are about to drop the `_AdmissionSchools` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AdmissionSchools" DROP CONSTRAINT "_AdmissionSchools_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdmissionSchools" DROP CONSTRAINT "_AdmissionSchools_B_fkey";

-- AlterTable
ALTER TABLE "Admission" DROP COLUMN "admissionClass",
DROP COLUMN "status";

-- DropTable
DROP TABLE "_AdmissionSchools";

-- CreateTable
CREATE TABLE "AdmissionStatus" (
    "id" SERIAL NOT NULL,
    "admissionId" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',

    CONSTRAINT "AdmissionStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdmissionStatus" ADD CONSTRAINT "AdmissionStatus_admissionId_fkey" FOREIGN KEY ("admissionId") REFERENCES "Admission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionStatus" ADD CONSTRAINT "AdmissionStatus_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
