import prisma from "~/server/database/client";
import {type IWorkSession} from "~/types/timeTracking/IWorkSession";
import {v4 as uuidv4} from "uuid";
import {IWorkSessionStep, WorkSessionStepType} from "~/types/timeTracking/IWorkSessionStep";

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
export async function deleteWorkSession (uid: string): Promise<IWorkSession | null> {
  const deleted = await recoverWorkSession(uid);
  await prisma.workSession.delete({
    where: {
      uid,
    }
  });
  return deleted;
}
export async function updateWorkSession (uid: string, payload: Partial<IWorkSession>): Promise<IWorkSession> {
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

  const session: IWorkSession = await recoverWorkSession(uid) as IWorkSession;
  return {
    ...session,
    status: session.end ? 'Ended' : 'In Progress',
    steps: session.steps ? session.steps.map(step => ({
      ...step,
      status: step.end ? 'Ended' : 'In Progress',
    })) : [],
  };
}
export async function stopWorkSession (uid: string): Promise<IWorkSession | null> {
  const old = await prisma.workSession.findUnique({
    where: {
      uid,
    },
    include: {
      steps: true
    }
  });
  if (!old) return null;

  const end = new Date();
  await prisma.workSession.update({
    where: {
      uid,
    },
    data: {
      end,
      elapsed: end.getTime() - new Date(old.start).getTime(),
    }
  });

  const session: IWorkSession = await prisma.workSession.findUnique({
    where: {
      uid,
    },
    include: {
      steps: true
    }
  }) as IWorkSession;
  return {
    ...session,
    status: 'Ended',
    steps: session.steps && session.steps.length ? session.steps.map(step => ({
      ...step,
      status: 'Ended',
    })) : [],
  };
}
export async function recoverLastStep (uid: string): Promise<IWorkSessionStep | null> {
  const step: IWorkSessionStep | null = await prisma.workSessionStep.findFirst({
    where: {
      sessionUid: uid,
    }
  }) as IWorkSessionStep | null;
  return step ? {
    ...step,
    status: step?.end ? 'Ended' : 'In Progress',
  } : null;
}
export async function stopLastStep (uid: string): Promise<IWorkSessionStep | null> {
  const end = new Date();
  const lastStep = await recoverLastStep(uid);
  if (!lastStep) return null;

  await prisma.workSessionStep.update({
    where: {
      id: lastStep.id,
    },
    data: {
      end,
      elapsed: end.getTime() - new Date(lastStep.start).getTime(),
    }
  });
  const step: IWorkSessionStep = await prisma.workSessionStep.findUnique({
    where: {
      id: lastStep.id,
    }
  }) as IWorkSessionStep;
  return {
    ...step,
    status: 'Ended'
  };
}
