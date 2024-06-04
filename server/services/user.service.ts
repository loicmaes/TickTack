import {findUserByEmail} from "~/server/database/repositories/user.repository";

interface ExistsCheck {
  value: boolean;
  message?: string;
}

export async function doesUserExists (email: string): Promise<ExistsCheck> {
  if (await findUserByEmail(email) !== null) return { value: true, message: `This email, ${email}, is already registered!` };
  return { value: false };
}
