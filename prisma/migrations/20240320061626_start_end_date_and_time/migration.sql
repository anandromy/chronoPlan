/*
  Warnings:

  - You are about to drop the column `endAt` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `startAt` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "id" SET DEFAULT concat('prj_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "endAt",
DROP COLUMN "startAt",
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "dueTime" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "startTime" TIMESTAMP(3),
ALTER COLUMN "id" SET DEFAULT concat('tsk_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));
