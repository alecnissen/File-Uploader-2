-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255),
    "password" TEXT,
    "age" INTEGER,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255),
    "password" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

