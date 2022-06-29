/*
  Warnings:

  - The primary key for the `RepositoriesOnUsers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Repository` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `RepositoriesOnUsers` DROP FOREIGN KEY `RepositoriesOnUsers_repositoryId_fkey`;

-- AlterTable
ALTER TABLE `RepositoriesOnUsers` DROP PRIMARY KEY,
    MODIFY `repositoryId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId`, `repositoryId`);

-- AlterTable
ALTER TABLE `Repository` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `RepositoriesOnUsers` ADD CONSTRAINT `RepositoriesOnUsers_repositoryId_fkey` FOREIGN KEY (`repositoryId`) REFERENCES `Repository`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
