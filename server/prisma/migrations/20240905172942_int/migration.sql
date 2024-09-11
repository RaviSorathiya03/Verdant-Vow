/*
  Warnings:

  - You are about to alter the column `followCount` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `followingCount` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - A unique constraint covering the columns `[userId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "followCount" SET DATA TYPE INTEGER,
ALTER COLUMN "followingCount" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Event_userId_key" ON "Event"("userId");
