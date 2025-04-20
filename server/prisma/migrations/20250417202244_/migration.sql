/*
  Warnings:

  - You are about to drop the column `crypto` on the `WalletAddress` table. All the data in the column will be lost.
  - Added the required column `name` to the `WalletAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol` to the `WalletAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WalletAddress" DROP COLUMN "crypto",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "symbol" TEXT NOT NULL;
