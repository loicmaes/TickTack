import {defineEventHandler, readBody, sendError} from "#imports";
import {createWorkSession} from "~/server/database/repositories/timeTracking.repository";
import {IWorkSession} from "~/types/timeTracking/IWorkSession";

export default defineEventHandler(async (event) => {
  const {userUid, name, start} = await readBody<IWorkSession>(event);
  return await createWorkSession({
    userUid,
    name,
    start
  });
});
