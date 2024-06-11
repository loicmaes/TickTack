import {defineEventHandler, readBody} from "#imports";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(`Received:`, body);
});
