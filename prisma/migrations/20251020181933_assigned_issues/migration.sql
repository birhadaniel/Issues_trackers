-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "assignedToUserId" VARCHAR(200);

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
