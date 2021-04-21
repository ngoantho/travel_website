/*
  Warnings:

  - A unique constraint covering the columns `[admin]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User.admin_unique" ON "User"("admin");
