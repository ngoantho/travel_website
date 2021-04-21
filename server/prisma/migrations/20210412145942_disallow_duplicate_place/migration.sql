/*
  Warnings:

  - A unique constraint covering the columns `[state]` on the table `Place` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Place.state_unique" ON "Place"("state");
