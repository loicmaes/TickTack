import {defineEventHandler, sendError, createError, getCookie} from "#imports";
import {recoverWorkSessions} from "~/server/database/repositories/timeTracking.repository";

export default defineEventHandler(async (event) => {
  const userUid = getCookie(event, 'user_uid');
  if (!userUid) return sendError(event, createError({
    statusCode: 400,
    statusMessage: 'Undefined user uid! Unable to recover sessions list.',
  }));
  return await recoverWorkSessions(userUid);
});
