-- CreateTable
CREATE TABLE `Users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NULL,
    `password` VARCHAR(191) NOT NULL,
    `registered_at` DATE NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profiles` (
    `profile_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `media_id` INTEGER NOT NULL,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    `phone_number` CHAR(12) NOT NULL,
    `bith_date` DATE NOT NULL,

    UNIQUE INDEX `Profiles_user_id_key`(`user_id`),
    UNIQUE INDEX `Profiles_media_id_key`(`media_id`),
    PRIMARY KEY (`profile_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medias` (
    `media_id` INTEGER NOT NULL AUTO_INCREMENT,
    `media_name` VARCHAR(191) NOT NULL,
    `media_path` VARCHAR(191) NOT NULL,
    `media_mimetype` VARCHAR(191) NOT NULL,
    `media_url` VARCHAR(191) NOT NULL,
    `media_size` INTEGER NOT NULL,

    PRIMARY KEY (`media_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Posts` (
    `post_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `media_id` INTEGER NOT NULL,
    `post_title` VARCHAR(100) NOT NULL,
    `post_slug` VARCHAR(100) NOT NULL,
    `post_excerpt` TEXT NOT NULL,
    `post_content` TEXT NOT NULL,
    `post_published` BOOLEAN NOT NULL DEFAULT false,
    `post_created` DATE NOT NULL,
    `post_last_updated` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Posts_user_id_key`(`user_id`),
    UNIQUE INDEX `Posts_media_id_key`(`media_id`),
    PRIMARY KEY (`post_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(50) NOT NULL,
    `category_slug` VARCHAR(50) NOT NULL,
    `created_at` DATE NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoriesOnPosts` (
    `post_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    PRIMARY KEY (`post_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profiles` ADD CONSTRAINT `Profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profiles` ADD CONSTRAINT `Profiles_media_id_fkey` FOREIGN KEY (`media_id`) REFERENCES `Medias`(`media_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_media_id_fkey` FOREIGN KEY (`media_id`) REFERENCES `Medias`(`media_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriesOnPosts` ADD CONSTRAINT `CategoriesOnPosts_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Posts`(`post_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriesOnPosts` ADD CONSTRAINT `CategoriesOnPosts_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
