/*
  Warnings:

  - The primary key for the `Repository` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Repository` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Repository` DROP PRIMARY KEY,
    DROP COLUMN `userId`,
    MODIFY `id` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RepositoriesOnUsers` (
    `repositoryId` BIGINT NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `repositoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RepositoriesOnUsers` ADD CONSTRAINT `RepositoriesOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RepositoriesOnUsers` ADD CONSTRAINT `RepositoriesOnUsers_repositoryId_fkey` FOREIGN KEY (`repositoryId`) REFERENCES `Repository`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
