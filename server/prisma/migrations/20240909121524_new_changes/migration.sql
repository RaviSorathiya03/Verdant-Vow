/*
  Warnings:

  - You are about to drop the column `images` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BlogTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BlogTags" DROP CONSTRAINT "_BlogTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlogTags" DROP CONSTRAINT "_BlogTags_B_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "images";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_BlogTags";
