-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `Profiles_media_id_fkey`;

-- AlterTable
ALTER TABLE `profiles` MODIFY `media_id` INTEGER NULL,
    MODIFY `first_name` VARCHAR(30) NULL,
    MODIFY `last_name` VARCHAR(30) NULL,
    MODIFY `phone_number` CHAR(12) NULL,
    MODIFY `bith_date` DATE NULL;

-- AddForeignKey
ALTER TABLE `Profiles` ADD CONSTRAINT `Profiles_media_id_fkey` FOREIGN KEY (`media_id`) REFERENCES `Medias`(`media_id`) ON DELETE SET NULL ON UPDATE CASCADE;
