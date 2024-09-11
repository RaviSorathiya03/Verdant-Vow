/*
  Warnings:

  - The values [ACTIVE] on the enum `eventStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "eventStatus_new" AS ENUM ('COMPLTED', 'PENDING', 'INCOMPLETE');
ALTER TABLE "Event" ALTER COLUMN "status" TYPE "eventStatus_new" USING ("status"::text::"eventStatus_new");
ALTER TYPE "eventStatus" RENAME TO "eventStatus_old";
ALTER TYPE "eventStatus_new" RENAME TO "eventStatus";
DROP TYPE "eventStatus_old";
COMMIT;
