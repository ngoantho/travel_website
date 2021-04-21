/*
  Warnings:

  - Added the required column `locatedInId` to the `Attraction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attraction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER DEFAULT 0,
    "locatedInId" INTEGER NOT NULL,
    FOREIGN KEY ("locatedInId") REFERENCES "Location" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Attraction" ("id", "name", "description", "price") SELECT "id", "name", "description", "price" FROM "Attraction";
DROP TABLE "Attraction";
ALTER TABLE "new_Attraction" RENAME TO "Attraction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
