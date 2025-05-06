-- DropForeignKey
ALTER TABLE "Repository" DROP CONSTRAINT "Repository_installationId_fkey";

-- DropForeignKey
ALTER TABLE "UserInstallation" DROP CONSTRAINT "UserInstallation_installationId_fkey";

-- AddForeignKey
ALTER TABLE "UserInstallation" ADD CONSTRAINT "UserInstallation_installationId_fkey" FOREIGN KEY ("installationId") REFERENCES "Installation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_installationId_fkey" FOREIGN KEY ("installationId") REFERENCES "Installation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
