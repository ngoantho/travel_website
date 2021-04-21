-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attraction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER DEFAULT 0
);
INSERT INTO "new_Attraction" ("id", "name", "description", "price") SELECT "id", "name", "description", "price" FROM "Attraction";
DROP TABLE "Attraction";
ALTER TABLE "new_Attraction" RENAME TO "Attraction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
