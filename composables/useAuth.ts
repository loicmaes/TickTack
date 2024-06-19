import type {IUser} from "~/types/IUser";
import {useState, useCookie, navigateTo} from "#imports";
import {useToast} from "~/components/ui/toast";
import {FetchError} from "ofetch";

export const useAuthCookie = () => useCookie('auth_token');

export async function useUser (): Promise<IUser | null> {
  const authCookie = useAuthCookie();
  const user = useState<IUser>('user');

  if (authCookie && !user.value) {
    const { data } = await useFetch<IUser>('/api/auth/recoverByToken', {
      headers: useRequestHeaders(['cookie']),
    });
    if (!data.value) return null;
    user.value = data.value;
  }

  return user.value;
}
export async function useStrictProtectedAccess (shouldBeAuthenticated?: boolean) {
  const user = useState<IUser>('user').value;
  if (shouldBeAuthenticated && !user) return navigateTo('/auth/login');
  if (!shouldBeAuthenticated && user) return navigateTo('/app');
}

export async function registerWithEmail (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
): Promise<void> {
  const { toast } = useToast();

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
    toast({
      title: `Congratulation 🎉`,
      description: `Welcome on TickTack! Hope you'll enjoy our tool.`
    })
    await navigateTo('/app');
  } catch (e) {
    const error = e as FetchError;
    switch (error.statusCode) {
      case 409:
        toast({
          title: 'Oops...',
          description: `This email, ${email}, is already in use! Try another.`,
          variant: 'destructive',
        });
        break;
      default:
        toast({
          title: 'Oops...',
          description: 'Something went wrong while creating your account!',
          variant: 'destructive',
        });
        break;
    }
  }
}

export async function loginWithEmail (
    email: string,
    password: string,
): Promise<void> {
  const { toast } = useToast();

  try {
    const res = await $fetch<IUser>('/api/auth/login', {
      method: 'POST',
      body: {
        email,
        password,
      }
    });

    if (!res) return;

    useState('user').value = res;
    toast({
      title: `Welcome back ${res.firstName} ${res.lastName} 👋`,
      description: `Are you ready to start working and tracking time?`
    });
    await navigateTo('/app');
  } catch (e) {
    const error = e as FetchError;
    switch (error.statusCode) {
      case 404:
        toast({
          title: 'Wrong credentials...',
          description: `This email or password is wrong. Try again.`,
          variant: 'destructive',
        });
        break;
      default:
        toast({
          title: 'Oops...',
          description: 'Something went wrong while retrieving your data!',
          variant: 'destructive',
        });
        break;
    }
  }
}

export async function localLogout () {
  await $fetch('/api/auth/logout', {
    headers: useRequestHeaders(['cookie']),
  });
  useState('user').value = null;
  await navigateTo('/');
}

export async function generalLogout () {
  await $fetch('/api/auth/globalLogout', {
    headers: useRequestHeaders(['cookie']),
  });
  useState('user').value = null;
  await navigateTo('/');
}
