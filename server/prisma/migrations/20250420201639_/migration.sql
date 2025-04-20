/*
  Warnings:

  - You are about to drop the column `amountReceived` on the `CryptoTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `amountTransferred` on the `CryptoTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `cryptoRate` on the `CryptoTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `currencyReceived` on the `CryptoTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `currencyTransferred` on the `CryptoTransaction` table. All the data in the column will be lost.
  - Added the required column `cryptoAmountSent` to the `CryptoTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cryptoTypeSent` to the `CryptoTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentUSDRate` to the `CryptoTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fiatAmountReceived` to the `CryptoTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fiatCurrency` to the `CryptoTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CryptoTransaction" DROP COLUMN "amountReceived",
DROP COLUMN "amountTransferred",
DROP COLUMN "cryptoRate",
DROP COLUMN "currencyReceived",
DROP COLUMN "currencyTransferred",
ADD COLUMN     "cryptoAmountSent" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cryptoTypeSent" TEXT NOT NULL,
ADD COLUMN     "currentUSDRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fiatAmountReceived" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fiatCurrency" DOUBLE PRECISION NOT NULL;
