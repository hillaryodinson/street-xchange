/*
  Warnings:

  - You are about to drop the column `date` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `transType` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transTypeId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('pending_price', 'pending_payment', 'booked');

-- AlterTable
ALTER TABLE "FlightTransaction" ADD COLUMN     "passengers" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'pending_price';

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "date",
DROP COLUMN "type",
DROP COLUMN "typeId",
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "transType" TEXT NOT NULL,
ADD COLUMN     "transTypeId" TEXT NOT NULL;
