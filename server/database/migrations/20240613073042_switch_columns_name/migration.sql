/*
  Warnings:

  - You are about to drop the column `type` on the `work_session_steps` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "work_session_steps" DROP COLUMN "type",
ADD COLUMN     "stepType" "WorkSessionStepType" NOT NULL DEFAULT 'working';
