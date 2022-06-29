-- CreateTable
CREATE TABLE `Repository` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataObj` JSON NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
