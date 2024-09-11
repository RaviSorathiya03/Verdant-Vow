/*
  Warnings:

  - Added the required column `followCount` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingCount` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "followCount" BIGINT NOT NULL,
ADD COLUMN     "followingCount" BIGINT NOT NULL;
