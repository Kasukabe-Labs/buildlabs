-- AlterTable
ALTER TABLE "user" ADD COLUMN     "votedProjects" TEXT[] DEFAULT ARRAY[]::TEXT[];
