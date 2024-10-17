-- CreateTable
CREATE TABLE "DriveLog" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "destination" TEXT,
    "odoStart" INTEGER NOT NULL,
    "odoEnd" INTEGER NOT NULL,
    "distance" INTEGER,

    CONSTRAINT "DriveLog_pkey" PRIMARY KEY ("id")
);
