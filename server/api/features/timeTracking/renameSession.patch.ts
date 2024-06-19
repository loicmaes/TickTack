import {defineEventHandler, readBody} from "#imports";
import {updateWorkSession} from "~/server/database/repositories/timeTracking.repository";

export default defineEventHandler(async (event) => {
  const {uid, newName: name } = await readBody(event);
  return await updateWorkSession(uid, { name });
});
