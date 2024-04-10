-- CreateTable
CREATE TABLE "Admission" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "status" TEXT,
    "parentId" INTEGER NOT NULL,

    CONSTRAINT "Admission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdmissionSchools" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AdmissionSchools_AB_unique" ON "_AdmissionSchools"("A", "B");

-- CreateIndex
CREATE INDEX "_AdmissionSchools_B_index" ON "_AdmissionSchools"("B");

-- AddForeignKey
ALTER TABLE "Admission" ADD CONSTRAINT "Admission_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdmissionSchools" ADD CONSTRAINT "_AdmissionSchools_A_fkey" FOREIGN KEY ("A") REFERENCES "Admission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdmissionSchools" ADD CONSTRAINT "_AdmissionSchools_B_fkey" FOREIGN KEY ("B") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;
