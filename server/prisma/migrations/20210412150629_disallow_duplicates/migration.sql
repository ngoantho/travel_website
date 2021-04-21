/*
  Warnings:

  - A unique constraint covering the columns `[locatedInId]` on the table `Attraction` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Place" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city" TEXT NOT NULL,
    "state" TEXT DEFAULT '',
    "countryId" INTEGER NOT NULL,
    FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Place" ("id", "city", "state", "countryId") SELECT "id", "city", "state", "countryId" FROM "Place";
DROP TABLE "Place";
ALTER TABLE "new_Place" RENAME TO "Place";
CREATE UNIQUE INDEX "Place.state_unique" ON "Place"("state");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Attraction.locatedInId_unique" ON "Attraction"("locatedInId");
