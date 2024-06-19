-- CreateEnum
CREATE TYPE "WorkSessionStepType" AS ENUM ('break', 'working');

-- AlterTable
ALTER TABLE "work_session_steps" ADD COLUMN     "elapsed" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "type" "WorkSessionStepType" NOT NULL DEFAULT 'working';
