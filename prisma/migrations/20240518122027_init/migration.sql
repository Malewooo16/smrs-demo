-- DropForeignKey
ALTER TABLE "StudentT" DROP CONSTRAINT "StudentT_admissionId_fkey";

-- AlterTable
ALTER TABLE "StudentT" ALTER COLUMN "admissionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "StudentT" ADD CONSTRAINT "StudentT_admissionId_fkey" FOREIGN KEY ("admissionId") REFERENCES "Admission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
