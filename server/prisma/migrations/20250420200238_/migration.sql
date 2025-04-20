/*
  Warnings:

  - You are about to drop the column `amount` on the `CryptoTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `amountNgn` on the `CryptoTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `CryptoTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `CryptoTransaction` table. All the data in the column will be lost.
  - Added the required column `amountReceived` to the `CryptoTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountTransferred` to the `CryptoTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cryptoRate` to the `CryptoTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currencyReceived` to the `CryptoTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currencyTransferred` to the `CryptoTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fiatRate` to the `CryptoTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletAddress` to the `CryptoTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletNetwork` to the `CryptoTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CryptoTransaction" DROP COLUMN "amount",
DROP COLUMN "amountNgn",
DROP COLUMN "rate",
DROP COLUMN "type",
ADD COLUMN     "amountReceived" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "amountTransferred" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cryptoRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "currencyReceived" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "currencyTransferred" TEXT NOT NULL,
ADD COLUMN     "fiatRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "walletAddress" TEXT NOT NULL,
ADD COLUMN     "walletNetwork" TEXT NOT NULL;
