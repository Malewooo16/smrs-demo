-- DropIndex
DROP INDEX "AdmissionStatus_admissionId_key";

-- AlterTable
ALTER TABLE "Admission" ADD COLUMN     "parentsInfo" JSONB;
