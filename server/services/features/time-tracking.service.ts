import {stopLastStep, stopWorkSession} from "~/server/database/repositories/timeTracking.repository";
import {IWorkSession} from "~/types/timeTracking/IWorkSession";

export async function terminateWorkSession (uid: string): Promise<IWorkSession> {
  await stopLastStep(uid);
  return await stopWorkSession(uid) as IWorkSession;
}
