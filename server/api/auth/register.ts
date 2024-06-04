import {readBody, sendError, createError} from "#imports";
import {doesUserExists} from "~/server/services/user.service";
import {IUser} from "~/types/IUser";
import {createUser} from "~/server/database/repositories/user.repository";

export default defineEventHandler(async (event): Promise<IUser | void> => {
  const { firstName, lastName, email, password } = await readBody(event);

  const userExists = await doesUserExists(email);
  if (userExists.value) return sendError(event, createError({
    statusCode: 409,
    statusMessage: userExists.message,
  }));

  return await createUser({
    firstName,
    lastName,
    email,
    password
  });
});
