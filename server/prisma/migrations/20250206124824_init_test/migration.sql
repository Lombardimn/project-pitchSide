-- CreateTable
CREATE TABLE "rol" (
    "Id" SERIAL NOT NULL,
    "Name" VARCHAR(50) NOT NULL,
    "Description" VARCHAR(255) NOT NULL,
    "CreatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "position" (
    "Id" SERIAL NOT NULL,
    "Name" VARCHAR(50) NOT NULL,
    "Description" VARCHAR(255) NOT NULL,
    "CreatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "position_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "position_subtype" (
    "Id" SERIAL NOT NULL,
    "Name" VARCHAR(50) NOT NULL,
    "PositionId" INTEGER NOT NULL,
    "Description" VARCHAR(255) NOT NULL,
    "CreatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "position_subtype_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "user" (
    "Id" TEXT NOT NULL,
    "Email" VARCHAR(50) NOT NULL,
    "Password" VARCHAR(255) NOT NULL,
    "Availability" SMALLINT NOT NULL DEFAULT 1,
    "CreatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "user_profile" (
    "Id" SERIAL NOT NULL,
    "UserId" TEXT NOT NULL,
    "Name" VARCHAR(50) NOT NULL,
    "Lastname" VARCHAR(50) NOT NULL,
    "Age" SMALLINT NOT NULL,
    "Image" VARCHAR(255) NOT NULL,
    "CreatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "user_position" (
    "Id" SERIAL NOT NULL,
    "UserId" TEXT NOT NULL,
    "PositionId" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "user_position_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "user_role" (
    "Id" SERIAL NOT NULL,
    "UserId" TEXT NOT NULL,
    "RoleId" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_Email_key" ON "user"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_UserId_key" ON "user_profile"("UserId");

-- CreateIndex
CREATE UNIQUE INDEX "user_role_UserId_key" ON "user_role"("UserId");

-- AddForeignKey
ALTER TABLE "position_subtype" ADD CONSTRAINT "position_subtype_PositionId_fkey" FOREIGN KEY ("PositionId") REFERENCES "position"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "user"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_position" ADD CONSTRAINT "user_position_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "user"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_position" ADD CONSTRAINT "user_position_PositionId_fkey" FOREIGN KEY ("PositionId") REFERENCES "position"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "user"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES "rol"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
