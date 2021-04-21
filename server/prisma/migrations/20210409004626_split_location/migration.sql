/*
  Warnings:

  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Location";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Country" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Place" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "countryId" INTEGER NOT NULL,
    FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attraction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER DEFAULT 0,
    "locatedInId" INTEGER NOT NULL,
    FOREIGN KEY ("locatedInId") REFERENCES "Place" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Attraction" ("id", "name", "description", "price", "locatedInId") SELECT "id", "name", "description", "price", "locatedInId" FROM "Attraction";
DROP TABLE "Attraction";
ALTER TABLE "new_Attraction" RENAME TO "Attraction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Country.name_unique" ON "Country"("name");
