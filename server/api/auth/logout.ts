import {defineEventHandler, deleteCookie, getCookie} from "#imports";
import {deleteSession} from "~/server/database/repositories/session.repository";

export default defineEventHandler(async event => {
  const userUid = getCookie(event, 'user_uid');
  const authToken = getCookie(event, 'auth_token');

  deleteCookie(event, 'user_uid');
  deleteCookie(event, 'auth_token');

  if (!userUid || !authToken) return;

  await deleteSession(userUid, authToken);
});
