/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[levelId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_eventId_key" ON "Post"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_levelId_key" ON "Post"("levelId");
