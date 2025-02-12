-- CreateTable
CREATE TABLE "user_validation" (
    "Id" SERIAL NOT NULL,
    "UserId" VARCHAR(36) NOT NULL,
    "Code" VARCHAR(255) NOT NULL,
    "CreatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "user_validation_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_validation_UserId_key" ON "user_validation"("UserId");

-- AddForeignKey
ALTER TABLE "user_validation" ADD CONSTRAINT "user_validation_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "user"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
