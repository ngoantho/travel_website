/*
  Warnings:

  - A unique constraint covering the columns `[attractionId,userId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Review.attractionId_unique";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "country" TEXT NOT NULL
);
INSERT INTO "new_Location" ("id", "city", "state", "country") SELECT "id", "city", "state", "country" FROM "Location";
DROP TABLE "Location";
ALTER TABLE "new_Location" RENAME TO "Location";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Review.attractionId_userId_unique" ON "Review"("attractionId", "userId");
