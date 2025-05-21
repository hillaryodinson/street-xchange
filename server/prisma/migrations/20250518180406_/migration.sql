/*
  Warnings:

  - The `status` column on the `CryptoTransaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `isPending` on the `GiftCardTransaction` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentTransactionStatus" AS ENUM ('PendingPayment', 'PaymentDone', 'PaymentConfirmed', 'PaymentExpired', 'PendingDisbursement', 'DisbursementDone');

-- AlterTable
ALTER TABLE "CryptoTransaction" DROP COLUMN "status",
ADD COLUMN     "status" "PaymentTransactionStatus" NOT NULL DEFAULT 'PendingPayment';

-- AlterTable
ALTER TABLE "GiftCardTransaction" DROP COLUMN "isPending",
ADD COLUMN     "disbursedAt" TIMESTAMP(3),
ADD COLUMN     "status" "PaymentTransactionStatus" NOT NULL DEFAULT 'PendingDisbursement';

-- DropEnum
DROP TYPE "CryptoTransactionStatus";
