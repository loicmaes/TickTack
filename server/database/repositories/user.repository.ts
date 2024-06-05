import {type IUser} from "~/types/IUser";
import prisma from "~/server/database/client";
import bcrypt from "bcrypt";

export async function createUser (data: IUser): Promise<IUser> {
  return await prisma.user.create({
    data: {
      ...data,
      password: await bcrypt.hash(data.password, 10),
    }
  })
}

export async function findUserByEmail (email: string): Promise<IUser | null> {
  return await prisma.user.findUnique({
    where: {
      email
    }
  })
}
