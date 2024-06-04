import {IUser} from "~/types/IUser";
import {useRuntimeConfig} from "#imports";
import jwt from "jsonwebtoken";
import {createSession, findSessionByAuthToken} from "~/server/database/repositories/session.repository";

export async function makeSession (user: IUser, event: any): Promise<IUser | undefined> {
  const { jwtSecret } = useRuntimeConfig();
  const authToken = jwt.sign({ userUid: user.uid }, jwtSecret, { expiresIn: '10h' });
  const session = await createSession({ userUid: user.uid, authToken });
  const userUid = session.userUid;

  if (!userUid) throw Error('Error Creating Session');

  setCookie(event, 'auth_token', authToken, { path: '/', httpOnly: true });
  return await findUserBySessionToken(authToken);
}

export async function findUserBySessionToken (authToken: string) {
  const session = await findSessionByAuthToken(authToken);
  if (!session) throw Error('Error Recovering Session');
  return session.user;
}
