/*
  Warnings:

  - Added the required column `template` to the `Mail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Mail" ADD COLUMN     "template" TEXT NOT NULL;
