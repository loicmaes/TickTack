import {defineEventHandler, readBody} from "#imports";
import {IRun} from "~/types/stopwatch/IRun";
import {saveRun} from "~/server/database/repositories/stopwatch.repository";

export default defineEventHandler(async (event): Promise<IRun> => {
  return await saveRun(await readBody(event));
})
