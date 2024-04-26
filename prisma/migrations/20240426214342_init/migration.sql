/*
  Warnings:

  - A unique constraint covering the columns `[admissionId]` on the table `AdmissionStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AdmissionStatus_admissionId_key" ON "AdmissionStatus"("admissionId");
