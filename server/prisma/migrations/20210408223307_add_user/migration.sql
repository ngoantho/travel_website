/*
  Warnings:

  - Made the column `userId` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT DEFAULT '',
    "rating" INTEGER DEFAULT 0,
    "attractionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    FOREIGN KEY ("attractionId") REFERENCES "Attraction" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("id", "title", "description", "rating", "attractionId", "userId") SELECT "id", "title", "description", "rating", "attractionId", "userId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE UNIQUE INDEX "Review.attractionId_unique" ON "Review"("attractionId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
