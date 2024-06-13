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
  const sessions: IWorkSession[] = await prisma.workSession.findMany({
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
  return sessions.map(session => ({
    ...session,
    status: session.end ? 'Ended' : 'In Progress',
    steps: session.steps ? session.steps.map(step => ({
      ...step,
      status: step.end ? 'Ended' : 'In Progress',
    })) : [],
  }));
}
export async function recoverWorkSession (uid: string): Promise<IWorkSession | null> {
  // @ts-ignore
  const session: IWorkSession | null = await prisma.workSession.findUnique({
    where: {
      uid
    },
    include: {
      steps: true,
    }
  });
  return !session ? null : {
    ...session,
    status: session.end ? 'Ended' : 'In Progress',
    steps: session.steps ? session.steps?.map(step => ({
      ...step,
      status: step.end ? 'Ended' : 'In Progress',
    })) : []
  };
}
export async function deleteWorkSession (uid: string) {} // TODO
export async function terminateWorkSession (uid: string) {} // TODO
export async function nextStepWorkSession (uid: string) {} // TODO
export async function updateWorkSession (uid: string, payload: Partial<IWorkSession>) {
  const dataPayload = {
    name: payload.name,
    end: payload.end,
    elapsed: payload.elapsed,
  }
  await prisma.workSession.update({
    where: {
      uid,
    },
    data: dataPayload,
  });
  return await recoverWorkSession(uid);
}
