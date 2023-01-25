-- DropForeignKey
ALTER TABLE `categoriesonposts` DROP FOREIGN KEY `CategoriesOnPosts_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `categoriesonposts` DROP FOREIGN KEY `CategoriesOnPosts_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `Posts_media_id_fkey`;

-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `Posts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `Profiles_media_id_fkey`;

-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `Profiles_user_id_fkey`;

-- AlterTable
ALTER TABLE `posts` MODIFY `post_last_updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE INDEX `CategoriesOnPosts_post_id_category_id_idx` ON `CategoriesOnPosts`(`post_id`, `category_id`);

-- RenameIndex
ALTER TABLE `posts` RENAME INDEX `user_id` TO `Posts_user_id_idx`;
