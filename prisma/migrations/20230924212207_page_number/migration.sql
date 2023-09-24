/*
  Warnings:

  - Added the required column `pageNumber` to the `ChapterPage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chapterpage` ADD COLUMN `pageNumber` INTEGER NOT NULL;
