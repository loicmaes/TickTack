import {defineEventHandler, readBody} from "#imports";
import {deleteWorkSession} from "~/server/database/repositories/timeTracking.repository";

export default defineEventHandler(async (event) => {
  const { uid } = await readBody(event);
  return await deleteWorkSession(uid);
})
