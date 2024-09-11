/*
  Warnings:

  - You are about to alter the column `fundRupee` on the `Funding` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Funding" ALTER COLUMN "fundRupee" SET DATA TYPE INTEGER;
