/*
  Warnings:

  - Added the required column `userId` to the `Installation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Installation" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Installation" ADD CONSTRAINT "Installation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
