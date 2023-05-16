/*
  Warnings:

  - You are about to drop the `Day` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Day";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "days_date_key" ON "days"("date");
