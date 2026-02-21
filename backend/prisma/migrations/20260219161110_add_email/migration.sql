/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Instituicao` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Instituicao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Instituicao" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Instituicao_email_key" ON "Instituicao"("email");
