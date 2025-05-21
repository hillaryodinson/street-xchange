/*
  Warnings:

  - Added the required column `accountId` to the `GiftCardTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GiftCardTransaction" ADD COLUMN     "accountId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "GiftCardTransaction" ADD CONSTRAINT "GiftCardTransaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "CustomerBank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
