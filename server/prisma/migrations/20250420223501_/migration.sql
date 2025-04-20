/*
  Warnings:

  - You are about to drop the column `isPending` on the `CryptoTransaction` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CryptoTransactionStatus" AS ENUM ('PendingPayment', 'PaymentDone', 'PaymentConfirmed', 'PaymentExpired');

-- AlterTable
ALTER TABLE "CryptoTransaction" DROP COLUMN "isPending",
ADD COLUMN     "status" "CryptoTransactionStatus" NOT NULL DEFAULT 'PendingPayment';
