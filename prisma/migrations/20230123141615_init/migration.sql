-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `Posts_media_id_fkey`;

-- AlterTable
ALTER TABLE `posts` MODIFY `media_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_media_id_fkey` FOREIGN KEY (`media_id`) REFERENCES `Medias`(`media_id`) ON DELETE SET NULL ON UPDATE CASCADE;
