-- AlterTable
ALTER TABLE "Admission" ADD COLUMN     "imgUrl" TEXT,
ADD COLUMN     "objects" JSONB;

-- AlterTable
ALTER TABLE "Parent" ADD COLUMN     "phoneNumber" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "admissionStatus" JSONB;
