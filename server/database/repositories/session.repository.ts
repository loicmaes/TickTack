import {ISession} from "~/types/ISession";
import prisma from "~/server/database/client";
import {IUser} from "~/types/IUser";

export async function createSession (data: ISession): Promise<ISession> {
  return await prisma.session.create({
    data: {
      userUid: data.userUid,
      authToken: data.authToken,
    }
  });
}
export async function deleteSession (userUid: string, authToken: string) {
  return await prisma.session.delete({
    where: {
      userUid_authToken: {
        userUid,
        authToken,
      }
    }
  });
}
export async function deleteAllSessions (userUid: string) {
  return await prisma.session.deleteMany({
    where: {
      userUid,
    }
  });
}

export async function findSessionByAuthToken (userUid: string, authToken: string): Promise<ISession | null> {
  const user = await findUserByAuthToken(userUid, authToken);
  return user ? { authToken, user, userUid: user.uid } : null;
}
export async function findUserByAuthToken (userUid: string, authToken: string): Promise<IUser | null> {
  return await prisma.session.findUnique({
    where: {
      userUid_authToken: {
        userUid,
        authToken,
      }
    }
  }).user();
}
