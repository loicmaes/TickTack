import {defineEventHandler, readBody} from "#imports";
import {terminateWorkSession} from "~/server/services/features/time-tracking.service";

export default defineEventHandler(async (event) => {
  const { uid } = await readBody(event);
  return await terminateWorkSession(uid);
});
