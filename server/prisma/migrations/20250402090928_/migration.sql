-- CreateTable
CREATE TABLE "CustomerBank" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountNo" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "otp" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "CustomerBank_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomerBank" ADD CONSTRAINT "CustomerBank_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
