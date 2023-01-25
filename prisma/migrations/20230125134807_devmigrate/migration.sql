/*
  Warnings:

  - You are about to drop the column `user_id` on the `posts` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `CategoriesOnPosts_category_id_fkey` ON `categoriesonposts`;

-- DropIndex
DROP INDEX `CategoriesOnPosts_post_id_category_id_idx` ON `categoriesonposts`;

-- DropIndex
DROP INDEX `Posts_user_id_idx` ON `posts`;

-- DropIndex
DROP INDEX `Posts_user_id_key` ON `posts`;

-- AlterTable
ALTER TABLE `posts` DROP COLUMN `user_id`,
    ADD COLUMN `author_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Profiles` ADD CONSTRAINT `Profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profiles` ADD CONSTRAINT `Profiles_media_id_fkey` FOREIGN KEY (`media_id`) REFERENCES `Medias`(`media_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_media_id_fkey` FOREIGN KEY (`media_id`) REFERENCES `Medias`(`media_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriesOnPosts` ADD CONSTRAINT `CategoriesOnPosts_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Posts`(`post_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriesOnPosts` ADD CONSTRAINT `CategoriesOnPosts_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
