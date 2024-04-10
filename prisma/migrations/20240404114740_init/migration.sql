/*
  Warnings:

  - The `score` column on the `CourseEnrollment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CourseEnrollment" DROP COLUMN "score",
ADD COLUMN     "score" JSONB;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "classId" INTEGER;

-- CreateTable
CREATE TABLE "Classes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "schoolId" INTEGER,

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
