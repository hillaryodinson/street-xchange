/*
  Warnings:

  - You are about to drop the column `isApproved` on the `Kyc` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('approved', 'declined', 'pending');

-- AlterTable
ALTER TABLE "Kyc" DROP COLUMN "isApproved",
ADD COLUMN     "declineReason" TEXT,
ADD COLUMN     "status" "ApprovalStatus" NOT NULL DEFAULT 'pending';
