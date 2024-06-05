import {defineEventHandler, getCookie} from "#imports";
import {deleteAllSessions} from "~/server/database/repositories/session.repository";

export default defineEventHandler(async event => {
  const userUid = getCookie(event, 'user_uid');
  if (!userUid) return;

  await deleteAllSessions(userUid);
});
