/*
  Warnings:

  - You are about to drop the column `parentId` on the `post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_parentId_fkey`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `parentId`;
