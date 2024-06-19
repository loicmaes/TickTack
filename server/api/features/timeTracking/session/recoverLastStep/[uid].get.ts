import {defineEventHandler, getRouterParam} from "#imports";
import {recoverLastStep} from "~/server/database/repositories/timeTracking.repository";

export default defineEventHandler(async (event) => {
  const uid = getRouterParam(event, 'uid');
  if (!uid) return sendError(event, createError({
    statusCode: 400,
    statusMessage: "UID parameter is missing!",
  }))
  return await recoverLastStep(uid);
});
