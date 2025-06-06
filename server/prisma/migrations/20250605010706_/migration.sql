-- AlterTable
ALTER TABLE "GiftCardTransaction" ALTER COLUMN "cardImage" DROP NOT NULL,
ALTER COLUMN "cardImage" SET DATA TYPE TEXT;
