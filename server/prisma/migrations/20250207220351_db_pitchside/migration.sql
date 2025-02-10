/*
  Warnings:

  - A unique constraint covering the columns `[Username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "Username" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_Username_key" ON "user"("Username");
