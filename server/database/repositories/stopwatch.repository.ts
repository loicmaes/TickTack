import {IRun} from "~/types/stopwatch/IRun";
import prisma from "~/server/database/client";

export async function saveRun (data: IRun) {
  return await prisma.stopWatchRun.create({
    data: {
      user: {
        connect: {
          uid: data.userUid,
        }
      },
      startedAt: new Date(data.startedAt),
      timeElapsed: data.timeElapsed,
      label: data.label,
      breaks: {
        create: data.breaks,
      }
    },
    include: {
      breaks: true,
    }
  });
}

export async function recoverRunsList (userUid: string) {
  return await prisma.stopWatchRun.findMany({
    where: {
      userUid,
    },
    include: {
      breaks: true,
    }
  });
}
