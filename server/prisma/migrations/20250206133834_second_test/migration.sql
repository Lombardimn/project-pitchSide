/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `Id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - You are about to alter the column `UserId` on the `user_position` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - You are about to alter the column `UserId` on the `user_profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - You are about to alter the column `UserId` on the `user_role` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.

*/
-- DropForeignKey
ALTER TABLE "user_position" DROP CONSTRAINT "user_position_UserId_fkey";

-- DropForeignKey
ALTER TABLE "user_profile" DROP CONSTRAINT "user_profile_UserId_fkey";

-- DropForeignKey
ALTER TABLE "user_role" DROP CONSTRAINT "user_role_UserId_fkey";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "Id" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "user_position" ALTER COLUMN "UserId" SET DATA TYPE VARCHAR(36);

-- AlterTable
ALTER TABLE "user_profile" ALTER COLUMN "UserId" SET DATA TYPE VARCHAR(36);

-- AlterTable
ALTER TABLE "user_role" ALTER COLUMN "UserId" SET DATA TYPE VARCHAR(36);

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "user"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_position" ADD CONSTRAINT "user_position_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "user"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "user"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
