-- AlterTable
ALTER TABLE "Admission" ADD COLUMN     "admissionClass" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "admissionClasses" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "emailAddress" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "phoneNumber" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "website" TEXT NOT NULL DEFAULT '';
