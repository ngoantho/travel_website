/*
  Warnings:

  - A unique constraint covering the columns `[locatedInId]` on the table `Attraction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Attraction.locatedInId_unique" ON "Attraction"("locatedInId");
