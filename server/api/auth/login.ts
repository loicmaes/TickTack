import {createError, defineEventHandler, readBody, sendError} from "#imports";
import {findUserByEmail} from "~/server/database/repositories/user.repository";
import {makeSession} from "~/server/services/session.service";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  const user = await findUserByEmail(email);
  if (!user) return sendError(event, createError({
    statusCode: 404,
    statusMessage: `This email, ${email}, doesn't belong to any account!`,
  }));

  if (!await bcrypt.compare(password, user.password)) return sendError(event, createError({
    statusCode: 400,
    statusMessage: `Wrong credentials!`,
  }));

  return await makeSession(user, event);
});
