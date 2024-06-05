import {IUser} from "~/types/IUser";
import {useRuntimeConfig} from "#imports";
import {v4 as uuidv4} from "uuid";
import {createSession, deleteSession, findSessionByAuthToken} from "~/server/database/repositories/session.repository";

export async function makeSession (user: IUser, event: any): Promise<IUser | undefined> {
  const authToken = uuidv4();
  const session = await createSession({ userUid: user.uid, authToken });
  const userUid = session.userUid;

  if (!userUid) throw Error('Error Creating Session');

  setCookie(event, 'auth_token', authToken, { path: '/', httpOnly: true });
  setCookie(event, 'user_uid', userUid, { path: '/', httpOnly: true });
  return await findUserBySessionToken(userUid, authToken);
}

export async function findUserBySessionToken (userUid: string, authToken: string) {
  const session = await findSessionByAuthToken(userUid, authToken);
  if (!session) throw Error('Error Recovering Session');
  return session.user;
}
