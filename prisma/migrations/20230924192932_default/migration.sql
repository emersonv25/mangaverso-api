-- AlterTable
ALTER TABLE `manga` MODIFY `type` VARCHAR(191) NOT NULL DEFAULT 'MANGA',
    MODIFY `viewsCount` INTEGER NOT NULL DEFAULT 0;
