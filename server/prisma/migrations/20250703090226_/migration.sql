/*
  Warnings:

  - You are about to drop the column `accountName` on the `CryptoTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `accountNo` on the `CryptoTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `bankName` on the `CryptoTransaction` table. All the data in the column will be lost.
  - The `flightCost` column on the `FlightTransaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `transId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transType` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `CryptoTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionType` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('GIFT_CARD', 'CRYPTO', 'FLIGHT');

-- AlterTable
ALTER TABLE "CryptoTransaction" DROP COLUMN "accountName",
DROP COLUMN "accountNo",
DROP COLUMN "bankName",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FlightTransaction" DROP COLUMN "flightCost",
ADD COLUMN     "flightCost" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transId",
DROP COLUMN "transType",
ADD COLUMN     "amount" DOUBLE PRECISION,
ADD COLUMN     "currency" TEXT,
ADD COLUMN     "reference" TEXT NOT NULL,
ADD COLUMN     "transactionType" "TransactionType" NOT NULL;

-- CreateIndex
CREATE INDEX "Transaction_customerId_idx" ON "Transaction"("customerId");

-- CreateIndex
CREATE INDEX "Transaction_createdDate_idx" ON "Transaction"("createdDate");

-- CreateIndex
CREATE INDEX "Transaction_status_idx" ON "Transaction"("status");

-- AddForeignKey
ALTER TABLE "CryptoTransaction" ADD CONSTRAINT "CryptoTransaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "CustomerBank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
