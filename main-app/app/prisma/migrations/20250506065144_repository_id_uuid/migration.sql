/*
  Warnings:

  - The primary key for the `Repository` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Repository" DROP CONSTRAINT "Repository_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Repository_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Repository_id_seq";
