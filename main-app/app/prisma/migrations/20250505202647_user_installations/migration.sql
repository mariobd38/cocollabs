/*
  Warnings:

  - You are about to drop the column `userId` on the `Installation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Installation" DROP CONSTRAINT "Installation_userId_fkey";

-- AlterTable
ALTER TABLE "Installation" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "UserInstallation" (
    "userId" TEXT NOT NULL,
    "installationId" INTEGER NOT NULL,
    "role" TEXT,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserInstallation_pkey" PRIMARY KEY ("userId","installationId")
);

-- AddForeignKey
ALTER TABLE "UserInstallation" ADD CONSTRAINT "UserInstallation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInstallation" ADD CONSTRAINT "UserInstallation_installationId_fkey" FOREIGN KEY ("installationId") REFERENCES "Installation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
