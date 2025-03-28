/*
  Warnings:

  - You are about to drop the column `actiToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenExpiresIn` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "actiToken",
DROP COLUMN "resetTokenExpiresIn",
ADD COLUMN     "tokenExpiresAt" TIMESTAMP(3);
