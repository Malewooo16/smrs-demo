-- AlterTable
ALTER TABLE "AdmissionStatus" ADD COLUMN     "activeClasses" TEXT[] DEFAULT ARRAY[]::TEXT[];
