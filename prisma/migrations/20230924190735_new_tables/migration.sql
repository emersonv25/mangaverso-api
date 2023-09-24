/*
  Warnings:

  - Added the required column `modifiedAt` to the `Manga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `Manga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Manga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `viewsCount` to the `Manga` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `manga` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `modifiedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `releaseDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL,
    ADD COLUMN `viewsCount` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Genre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chapter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mangaId` INTEGER NOT NULL,
    `chapterNumber` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChapterPage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chapterId` INTEGER NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GenreToManga` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GenreToManga_AB_unique`(`A`, `B`),
    INDEX `_GenreToManga_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_mangaId_fkey` FOREIGN KEY (`mangaId`) REFERENCES `Manga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChapterPage` ADD CONSTRAINT `ChapterPage_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `Chapter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GenreToManga` ADD CONSTRAINT `_GenreToManga_A_fkey` FOREIGN KEY (`A`) REFERENCES `Genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GenreToManga` ADD CONSTRAINT `_GenreToManga_B_fkey` FOREIGN KEY (`B`) REFERENCES `Manga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
