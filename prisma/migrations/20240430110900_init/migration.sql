-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "canAccessAcademics" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canAccessAdmissions" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canAccessDiscpline" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "StudentRemarks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "studentTId" INTEGER,

    CONSTRAINT "StudentRemarks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentRemarks" ADD CONSTRAINT "StudentRemarks_studentTId_fkey" FOREIGN KEY ("studentTId") REFERENCES "StudentT"("id") ON DELETE SET NULL ON UPDATE CASCADE;
