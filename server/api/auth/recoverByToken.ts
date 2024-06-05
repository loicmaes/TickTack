import { IUser } from "~/types/IUser";
import {findUserBySessionToken} from "~/server/services/session.service";
import {getCookie} from "#imports";

export default defineEventHandler(async (event): Promise<IUser | undefined> => {
  const authToken = getCookie(event, 'auth_token');
  const userUid = getCookie(event, 'user_uid');
  if (!authToken || !userUid) return undefined;
  return await findUserBySessionToken(userUid, authToken);
});
