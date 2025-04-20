/*
  Warnings:

  - Added the required column `accountName` to the `CryptoTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountNo` to the `CryptoTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankName` to the `CryptoTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CryptoTransaction" ADD COLUMN     "accountName" TEXT NOT NULL,
ADD COLUMN     "accountNo" TEXT NOT NULL,
ADD COLUMN     "bankName" TEXT NOT NULL;
