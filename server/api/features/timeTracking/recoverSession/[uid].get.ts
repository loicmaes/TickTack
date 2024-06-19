import {recoverWorkSession} from "~/server/database/repositories/timeTracking.repository";

export default defineEventHandler(async event => {
  const uid = getRouterParam(event, 'uid') as string;
  return await recoverWorkSession(uid);
});
