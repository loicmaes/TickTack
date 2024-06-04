import {readBody, sendError, createError} from "#imports";
import {doesUserExists} from "~/server/services/user.service";
import {IUser} from "~/types/IUser";
import {createUser} from "~/server/database/repositories/user.repository";
import {v4 as uuidv4} from "uuid";
import {makeSession} from "~/server/services/session.service";

export default defineEventHandler(async (event): Promise<IUser | void> => {
  const { firstName, lastName, email, password } = await readBody(event);

  const userExists = await doesUserExists(email);
  if (userExists.value) return sendError(event, createError({
    statusCode: 409,
    statusMessage: userExists.message,
  }));

  const user = await createUser({
    uid: uuidv4(),
    firstName,
    lastName,
    email,
    password
  });
  return await makeSession(user, event); 
});
