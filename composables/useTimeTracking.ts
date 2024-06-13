import type {IUser} from "~/types/IUser";
import {useToast} from "~/components/ui/toast";
import type {IWorkSession} from "~/types/timeTracking/IWorkSession";
import {useRequestHeaders} from "#imports";

export async function startSession (name: string): Promise<void> {
  const userUid = useState<IUser>('user').value.uid;
  const {toast} = useToast();

  try {
    const res = await $fetch('/api/features/timeTracking/createSession', {
      method: 'POST',
      body: {
        userUid,
        name
      }
    });
    toast({
      title: 'Congratulations 🎉',
      description: `Your work session is ready. Enjoy it and don't forget to add checkpoints.`
    });
    await navigateTo(`/app/time-tracking/${res.uid}`);
  } catch (e) {
    toast({
      title: 'Oops 💢',
      description: 'An error occurred while creating your session...',
      variant: 'destructive',
    });
  }
}
export async function useWorkSession (sessionUid: string): Promise<IWorkSession | null> {
  try {
    return await $fetch<IWorkSession | null>(`/api/features/timeTracking/recoverSession/${sessionUid}`);
  } catch (e) {
    return null;
  }
}
export async function useWorkHistory (): Promise<IWorkSession[]> {
  try {
    return await $fetch<IWorkSession[]>('/api/features/timeTracking/recoverSession/list', {
      headers: useRequestHeaders(),
    });
  } catch (e) {
    return [];
  }
}
export async function renameWorkSession (uid: string, newName: string): Promise<IWorkSession | null> {
  const {toast} = useToast();

  try {
    const renamed = await $fetch<IWorkSession>('/api/features/timeTracking/renameSession', {
      headers: useRequestHeaders(),
      method: 'PATCH',
      body: {
        uid,
        newName
      },
    });

    toast({
      title: 'Well done 👏',
      description: `Your session was successfully renamed! Find it using "${newName}".`,
    });

    return renamed;
  } catch (e) {
    toast({
      title: 'Oops 💢',
      description: 'Something gone wrong while renaming your session... Try again.',
      variant: 'destructive',
    });
  }

  return null;
}
