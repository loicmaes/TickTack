import {ISession} from "~/types/ISession";
import prisma from "~/server/database/client";
import {IUser} from "~/types/IUser";

export async function createSession (data: ISession): Promise<ISession> {
  // @ts-ignore
  return await prisma.session.create({
    data: {
      ...data,
    }
  });
}

export async function findSessionByAuthToken (authToken: string): Promise<ISession> {
  const user: IUser = await findUserByAuthToken(authToken);
  return { authToken, user, userUid: user.uid };
}
export async function findUserByAuthToken (authToken: string): Promise<IUser> {
  // @ts-ignore
  return await prisma.session.findUnique({
    where: {
      authToken,
    }
  }).user();
}
