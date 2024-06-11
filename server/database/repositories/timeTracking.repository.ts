import prisma from "~/server/database/client";
import {type IWorkSession} from "~/types/timeTracking/IWorkSession";
import {v4 as uuidv4} from "uuid";

export async function createWorkSession ({ userUid, name }: IWorkSession): Promise<IWorkSession> {
  // @ts-ignore
  return await prisma.workSession.create({
    data: {
      uid: uuidv4(),
      user: {
        connect: {
          uid: userUid,
        }
      },
      name,
      start: new Date(),
      steps: {
        create: {
          start: new Date(),
        }
      }
    },
    include: {
      steps: true,
    }
  })
}
export async function recoverWorkSessions (userUid: string): Promise<IWorkSession[]> {
  // @ts-ignore
  return await prisma.workSession.findMany({
    where: {
      userUid,
    },
    include: {
      steps: true,
    },
    orderBy: {
      start: 'desc'
    }
  });
}
export async function recoverWorkSession (uid: string): Promise<IWorkSession | null> {
  // @ts-ignore
  return await prisma.workSession.findUnique({
    where: {
      uid
    },
    include: {
      steps: true,
    }
  });
}
export async function deleteWorkSession (uid: string) {} // TODO
export async function terminateWorkSession (uid: string) {} // TODO
export async function nextStepWorkSession (uid: string) {} // TODO
