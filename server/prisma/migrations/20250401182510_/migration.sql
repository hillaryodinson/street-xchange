/*
  Warnings:

  - The values [pending_price,pending_payment,booked] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `transType` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transTypeId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `currency` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('Pending', 'Completed', 'Failed');

-- AlterEnum
BEGIN;
CREATE TYPE "BookingStatus_new" AS ENUM ('PendingAvailability', 'FlightUnavailable', 'PendingPayment', 'Booked', 'Cancelled');
ALTER TABLE "FlightTransaction" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "FlightTransaction" ALTER COLUMN "status" TYPE "BookingStatus_new" USING ("status"::text::"BookingStatus_new");
ALTER TYPE "BookingStatus" RENAME TO "BookingStatus_old";
ALTER TYPE "BookingStatus_new" RENAME TO "BookingStatus";
DROP TYPE "BookingStatus_old";
ALTER TABLE "FlightTransaction" ALTER COLUMN "status" SET DEFAULT 'PendingAvailability';
COMMIT;

-- AlterTable
ALTER TABLE "FlightTransaction" ADD COLUMN     "flightCost" TEXT,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "walletAddress" TEXT,
ADD COLUMN     "walletNetwork" TEXT,
ALTER COLUMN "status" SET DEFAULT 'PendingAvailability';

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transType",
DROP COLUMN "transTypeId",
ADD COLUMN     "cryptoTransId" TEXT,
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "flightTransId" TEXT,
ADD COLUMN     "giftcardTransId" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "TransactionStatus" NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_cryptoTransId_fkey" FOREIGN KEY ("cryptoTransId") REFERENCES "CryptoTransaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_flightTransId_fkey" FOREIGN KEY ("flightTransId") REFERENCES "FlightTransaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_giftcardTransId_fkey" FOREIGN KEY ("giftcardTransId") REFERENCES "GiftCardTransaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
