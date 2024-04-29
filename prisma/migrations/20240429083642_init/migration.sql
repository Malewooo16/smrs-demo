-- AlterTable
ALTER TABLE "CourseEnrollment" ADD COLUMN     "studentTId" INTEGER;

-- CreateTable
CREATE TABLE "StudentT" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "classId" INTEGER,
    "admissionId" TEXT NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "StudentT_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentT" ADD CONSTRAINT "StudentT_admissionId_fkey" FOREIGN KEY ("admissionId") REFERENCES "Admission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentT" ADD CONSTRAINT "StudentT_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentT" ADD CONSTRAINT "StudentT_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentT" ADD CONSTRAINT "StudentT_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_studentTId_fkey" FOREIGN KEY ("studentTId") REFERENCES "StudentT"("id") ON DELETE SET NULL ON UPDATE CASCADE;
