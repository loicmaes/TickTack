import type {IUser} from "~/types/IUser";
import {useToast} from "~/components/ui/toast";

export async function startSession () {
  const userUid = useState<IUser>('user').value.uid;
  const {toast} = useToast();

  try {
    const res = await $fetch('/api/features/timeTracking/createSession', {
      method: 'POST',
      body: {}
    });
  } catch (e) {
    toast({
      title: 'Oops 💢',
      description: 'An error occurred while creating your session...',
      variant: 'destructive',
    });
  }
}
