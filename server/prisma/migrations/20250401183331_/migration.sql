/*
  Warnings:

  - You are about to drop the column `customerId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `FlightTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FlightTransaction" ADD COLUMN     "customerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "customerId";
