/*
  Warnings:

  - The `cardImage` column on the `GiftCardTransaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "GiftCardTransaction" DROP COLUMN "cardImage",
ADD COLUMN     "cardImage" TEXT[];
