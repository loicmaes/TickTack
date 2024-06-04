import type {IUser} from "~/types/IUser";
import {useState, useCookie} from "#imports";

export const useAuthCookie = () => useCookie('auth_token');

export async function useUser (): Promise<IUser> {
  const authCookie = useAuthCookie();
  const user = useState<IUser>('user');

  if (authCookie && !user.value) {
    const { data } = await useFetch<IUser>('/api/auth/recoverByToken', {
      headers: useRequestHeaders(['cookie']),
    });
    if (!data.value) throw Error('Logged out!');
    user.value = data.value;
  }

  return user.value;
}

export async function registerWithEmail (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
): Promise<void> {
  try {
    const res = await $fetch<IUser>('/api/auth/register', {
      method: 'POST',
      body: {
        firstName,
        lastName,
        email,
        password
      }
    });

    if (!res) return;

    useState('user').value = res;
    await navigateTo('/app');
  } catch (e) {
    console.error(`Error: ${e?.toString()}`);
  }
}
