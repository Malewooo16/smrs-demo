/*
  Warnings:

  - A unique constraint covering the columns `[studentId,courseId]` on the table `CourseEnrollment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CourseEnrollment_studentId_courseId_key" ON "CourseEnrollment"("studentId", "courseId");
