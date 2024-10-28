/*
  Warnings:

  - You are about to drop the column `usuario` on the `Carteiras` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Carteiras" DROP COLUMN "usuario";

-- CreateTable
CREATE TABLE "Classes" (
    "id" SERIAL NOT NULL,
    "chave" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("id")
);
