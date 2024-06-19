-- CreateTable
CREATE TABLE "users" (
    "uid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "userUid" TEXT NOT NULL,
    "authToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sw_runs" (
    "id" SERIAL NOT NULL,
    "userUid" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "timeElapsed" DOUBLE PRECISION NOT NULL,
    "label" TEXT,

    CONSTRAINT "sw_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sw_breaks" (
    "id" SERIAL NOT NULL,
    "runId" INTEGER NOT NULL,
    "label" TEXT,
    "relativeTimeElapsed" DOUBLE PRECISION NOT NULL,
    "absoluteTimeElapsed" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "sw_breaks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_sessions" (
    "uid" TEXT NOT NULL,
    "userUid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" TIMESTAMP(3),
    "elapsed" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "work_sessions_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "work_session_steps" (
    "id" SERIAL NOT NULL,
    "sessionUid" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3),
    "comment" TEXT,

    CONSTRAINT "work_session_steps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_userUid_authToken_key" ON "sessions"("userUid", "authToken");

-- CreateIndex
CREATE UNIQUE INDEX "work_sessions_userUid_name_key" ON "work_sessions"("userUid", "name");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sw_runs" ADD CONSTRAINT "sw_runs_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sw_breaks" ADD CONSTRAINT "sw_breaks_runId_fkey" FOREIGN KEY ("runId") REFERENCES "sw_runs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_sessions" ADD CONSTRAINT "work_sessions_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_session_steps" ADD CONSTRAINT "work_session_steps_sessionUid_fkey" FOREIGN KEY ("sessionUid") REFERENCES "work_sessions"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
