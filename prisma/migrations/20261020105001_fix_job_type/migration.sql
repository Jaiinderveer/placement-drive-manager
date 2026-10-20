/*
  Warnings:

  - You are about to drop the column `jobtype` on the `PlacementDrive` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlacementDrive" DROP COLUMN "jobtype",
ADD COLUMN     "jobType" TEXT;
