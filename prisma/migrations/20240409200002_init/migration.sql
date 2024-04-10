/*
  Warnings:

  - The primary key for the `Admission` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_AdmissionSchools" DROP CONSTRAINT "_AdmissionSchools_A_fkey";

-- AlterTable
ALTER TABLE "Admission" DROP CONSTRAINT "Admission_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Admission_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Admission_id_seq";

-- AlterTable
ALTER TABLE "_AdmissionSchools" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_AdmissionSchools" ADD CONSTRAINT "_AdmissionSchools_A_fkey" FOREIGN KEY ("A") REFERENCES "Admission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
