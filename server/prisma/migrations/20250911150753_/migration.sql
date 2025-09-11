/*
  Warnings:

  - The primary key for the `Mail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `content` on the `Mail` table. All the data in the column will be lost.
  - You are about to drop the column `isDelivered` on the `Mail` table. All the data in the column will be lost.
  - The `id` column on the `Mail` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `context` to the `Mail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Mail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Mail" DROP CONSTRAINT "Mail_pkey",
DROP COLUMN "content",
DROP COLUMN "isDelivered",
ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "context" JSONB NOT NULL,
ADD COLUMN     "error" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Mail_pkey" PRIMARY KEY ("id");
