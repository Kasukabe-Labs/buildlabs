-- AlterTable
ALTER TABLE "user" ADD COLUMN     "github" TEXT,
ADD COLUMN     "hasDetails" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "twitter" TEXT;
