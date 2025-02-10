/*
  Warnings:

  - You are about to drop the column `Age` on the `user_profile` table. All the data in the column will be lost.
  - Added the required column `Age` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "Age" SMALLINT NOT NULL;

-- AlterTable
ALTER TABLE "user_profile" DROP COLUMN "Age";
