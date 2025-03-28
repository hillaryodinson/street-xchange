/*
  Warnings:

  - You are about to drop the column `accountStatus` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountStatus",
ADD COLUMN     "actiToken" TEXT,
ADD COLUMN     "isVerified" INTEGER NOT NULL DEFAULT 0;
