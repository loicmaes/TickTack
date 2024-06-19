import type {IRun} from "~/types/stopwatch/IRun";
import {useToast} from "~/components/ui/toast";
import type {IUser} from "~/types/IUser";
import {useState} from "#imports";

export async function useStopwatchHistory (): Promise<IRun[]> {
  try {
    const list = await $fetch<IRun[]>(`/api/features/stopwatch/recoverList/${useState<IUser>('user').value.uid}`);
    if (list.length) return list;
  } catch (e) {
    console.error(e?.toString());
  }
  return [];
}
export async function saveRunCopy (run: IRun): Promise<IRun | undefined> {
  const { toast } = useToast();

  try {
    const copy = await $fetch<IRun>('/api/features/stopwatch/saveACopy', {
      method: "POST",
      body: {
        userUid: useState<IUser>('user').value.uid,
        startedAt: run.startedAt,
        timeElapsed: run.timeElapsed,
        breaks: run.breaks,
      },
    });
    toast({
      title: 'Congratulations 🎉',
      description: 'Your run has been saved as a copy, you won\'t be able to update it!',
    });

    return copy;
  } catch (e) {
    toast({
      title: 'Oops...',
      description: 'Something went wrong while saving a copy. Try again',
      variant: 'destructive',
    });
  }

  return undefined;
}
