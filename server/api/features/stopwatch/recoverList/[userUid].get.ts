import {recoverRunsList} from "~/server/database/repositories/stopwatch.repository";
import {defineEventHandler, getRouterParam} from "#imports";

export default defineEventHandler(async (event) => {
  const userUid = getRouterParam(event, 'userUid');
  return await recoverRunsList(userUid);
});
