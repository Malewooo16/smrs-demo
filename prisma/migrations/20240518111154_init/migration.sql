-- AlterTable
ALTER TABLE "StudentT" ADD COLUMN     "scores" JSONB[],
ADD COLUMN     "showRecords" BOOLEAN NOT NULL DEFAULT false;
