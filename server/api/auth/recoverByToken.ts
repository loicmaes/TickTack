import { IUser } from "~/types/IUser";
import {findUserBySessionToken} from "~/server/services/session.service";
import {getCookie} from "#imports";

export default defineEventHandler(async (event): Promise<IUser | undefined> => {
  const authToken = getCookie(event, 'auth_token');
  if (!authToken) return undefined;
  return await findUserBySessionToken(authToken);
});
