-- CreateEnum
CREATE TYPE "status" AS ENUM ('open', 'filled', 'cancelled');

-- CreateEnum
CREATE TYPE "side" AS ENUM ('sell', 'buy');

-- CreateEnum
CREATE TYPE "typeprice" AS ENUM ('limit', 'market');

-- CreateEnum
CREATE TYPE "typeuser" AS ENUM ('maker', 'taker');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "market" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "type" "typeprice" NOT NULL,
    "side" "side" NOT NULL,
    "filledQuantity" INTEGER NOT NULL,
    "status" "status" NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fills" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "side" "side" NOT NULL,
    "type" "typeuser" NOT NULL,
    "userID" INTEGER NOT NULL,
    "price" BIGINT NOT NULL,
    "asset" TEXT NOT NULL,
    "originalOrderID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stocks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,

    CONSTRAINT "Stocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stocks_name_key" ON "Stocks"("name");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fills" ADD CONSTRAINT "Fills_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fills" ADD CONSTRAINT "Fills_asset_fkey" FOREIGN KEY ("asset") REFERENCES "Stocks"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
